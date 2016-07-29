<p align="center">
  <a href="http://courses.angularclass.com/courses/angular-2-fundamentals" target="_blank">
    <img width="438" alt="Angular 2 Fundamentals" src="https://cloud.githubusercontent.com/assets/1016365/17200649/085798c6-543c-11e6-8ad0-2484f0641624.png">
  </a>
</p>

---

# AngularClass Webpack Toolkit
> Webpack helpers and tools for Angular 2

# Install
```bash
npm install @angularclass/webpack-toolkit --save-dev
```

# Async Component Route
`app/about/about.ts`
```typescript
@Component({
  selector: 'about',
  template: '<h1>About</h1>'
})
export class About {}
```
`app/app.routes.ts`
```typescript
export const routes = [
  { path: '', component: Home },
  { path: 'about', component: 'About' }
];

// create index.ts that exports this file
```
`main.browser.ts`
```typescript
import {routes} from './app/app.routes';
import { provideWebpack } from '@angularclass/webpack-toolkit';
bootstrap(App, [
  provideRouter(routes),
  provideWebpack({
    'About': require('es6-promise!./app/about')
  })

]);
```

## Async Component with Children Routes
`app/about/about.ts`
```typescript
@Component({
  selector: 'about',
  template: '<h1>About</h1> <router-outlet></router-outlet>'
})
export class About {}

export const routes = {
 path: 'about', component: About,
 children: [
   { path: '', component: Index },
   { path: 'edit', component: Edit }
 ]
}
```
`app/app.routes.ts`
```typescript
import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
export const routes = [
  { path: '', component: Home },
  { path: 'about', component: 'About', canActivate: [ WebpackAsyncRoute ] }
];

// create index.ts that exports this file
```
`main.browser.ts`
```typescript
import { routes } from './app/app.routes';
import { provideWebpack } from '@angularclass/webpack-toolkit';
bootstrap(App, [
  provideRouter(routes),
  
  provideWebpack({
    'About': require('es6-promise!./app/about')
  })

]);
```

___

enjoy — **AngularClass**

<br><br>

[![AngularClass](https://cloud.githubusercontent.com/assets/1016365/9863770/cb0620fc-5af7-11e5-89df-d4b0b2cdfc43.png  "Angular Class")](https://angularclass.com)
##[AngularClass](https://angularclass.com)
> Learn AngularJS, Angular 2, and Modern Web Development from the best.
> Looking for corporate Angular training, want to host us, or Angular consulting? patrick@angularclass.com
