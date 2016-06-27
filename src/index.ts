import { ComponentResolver, Injectable, Inject } from '@angular/core';
import { RuntimeCompiler } from '@angular/compiler';

export const AC_WEBPACK_ASYNC_MAP = {};

@Injectable()
export class WebpackAsyncModules {
  constructor(
    @Inject(AC_WEBPACK_ASYNC_MAP) private _asyncComponents: any) {

  }
  fetch(moduleName: string) {
    return this._asyncComponents[moduleName]();
  }
  hasModule(moduleName: string) {
    return !!this._asyncComponents[moduleName];
  }
}

@Injectable()
export class WebpackComponentResolver {
  constructor(
    private _resolver: ComponentResolver,
    private _webpackAsyncModules: WebpackAsyncModules) {

  }

  resolveComponent(componentType: any) {
    if (typeof componentType === 'string' && this._webpackAsyncModules.hasModule[componentType]) {
      return this._webpackAsyncModules.fetch(componentType)
        .then(cmpFile => {
          let component = this._resolveExports(cmpFile, componentType);
          return this._resolver.resolveComponent(component);
        });
    }
    return this._resolver.resolveComponent(componentType);
  }

  clearCache(): void {}

  private _resolveExports(cmpFile, componentType) {
    return cmpFile[componentType] || cmpFile.default || cmpFile;
  }
}



export const ANGULARCLASS_WEBPACK_RUNTIME_PROVIDERS = [
  { provide: AC_WEBPACK_ASYNC_MAP, useValue: {} },
  WebpackAsyncModules,
  {
    provide: ComponentResolver,
    useFactory: (resolver, webpackAsyncModules) => {
      return new WebpackComponentResolver(resolver, webpackAsyncModules);
    },
    deps: [RuntimeCompiler, WebpackAsyncModules]
  }
];

export function provideWebpack(asyncModules) {
  return [
    ...ANGULARCLASS_WEBPACK_RUNTIME_PROVIDERS,
    { provide: AC_WEBPACK_ASYNC_MAP, useValue: asyncModules },
  ];
}
