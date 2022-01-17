import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialSettingState } from 'src/app/reducers/setting.reducer';

import { FileExporterComponent } from './file-exporter.component';

describe('FileExporterComponent', () => {
  let component: FileExporterComponent;
  let fixture: ComponentFixture<FileExporterComponent>;
  const initialState = { setting: initialSettingState };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileExporterComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
