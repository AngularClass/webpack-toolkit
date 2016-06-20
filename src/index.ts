import { ComponentResolver, Injectable, Inject } from '@angular/core';
import { RuntimeCompiler } from '@angular/compiler';

export const AC_WEBPACK_ASYNC_MAP = {};


export const ANGULARCLASS_WEBPACK_RUNTIME_PROVIDERS = [
  { provide: AC_WEBPACK_ASYNC_MAP, useValue: {} },
  {
    provide: ComponentResolver,
    useFactory: (resolver, asyncMap) => {
      return new WebpackComponentResolver(resolver, asyncMap);
    },
    deps: [RuntimeCompiler, AC_WEBPACK_ASYNC_MAP]
  }
];

export function provideWebpack(config) {
  return [
    ...ANGULARCLASS_WEBPACK_RUNTIME_PROVIDERS,
    { provide: AC_WEBPACK_ASYNC_MAP, useValue: config },
  ];
}

@Injectable()
export class WebpackComponentResolver {
  constructor(
    private _resolver: ComponentResolver,
    @Inject(AC_WEBPACK_ASYNC_MAP) private _asyncComponents: any) {

  }

  resolveComponent(componentType: any) {
    if (typeof componentType === 'string' && this._asyncComponents[componentType]) {
      return this._fetchComponent(componentType);
    }
    return this._resolver.resolveComponent(componentType);
  }


  prefetchComponent(componentType) {
    return this._fetchComponent(componentType);
  }


  clearCache(): void {}

  private _fetchComponent(componentType) {
    return this._asyncComponents[componentType](componentType)
      .then(cmp => {
        return this._resolver.resolveComponent(cmp);
      });
  }
}
