import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
//bootstrap the main application module
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
