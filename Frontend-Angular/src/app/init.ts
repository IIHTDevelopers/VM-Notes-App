import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

export class TestBedInitializer {
  isInitialized: Boolean = false;
  getTestBed() {
    if (!this.isInitialized) {
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting()
      );
      this.isInitialized = true;
    }
    return TestBed;
  }
}
