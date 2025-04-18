// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { RuleBuilderComponent } from './components/rule-builder/rule-builder.component';

export const routes: Routes = [
  { path: '', redirectTo: 'builder', pathMatch: 'full' },
  { path: 'builder', component: RuleBuilderComponent }
];
