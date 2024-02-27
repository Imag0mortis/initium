import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { RequestServiceService } from '../../services/request.service.service';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl, FormArray} from '@angular/forms';
import { TuiValidationError, tuiIsFalsy } from '@taiga-ui/cdk';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { of, interval, scan, map, startWith } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [
    {
        provide: TUI_VALIDATION_ERRORS,
        useValue: {
            required: 'Enter this!',
            email: 'Enter a valid email',
            maxlength: ({requiredLength}: {requiredLength: string}) =>
                `Maximum length — ${requiredLength}`,
            minlength: ({requiredLength}: {requiredLength: string}) =>
                of(`Minimum length — ${requiredLength}`),
            min: interval(2000).pipe(
                scan(tuiIsFalsy, false),
                map(val => (val ? 'Fix please' : 'Min number 3')),
                startWith('Min number 3'),
            ),
        },
    },
],

})
export class TableComponent implements OnInit {

  @ViewChild('phoneErrorContent')
    phoneErrorContent: PolymorpheusContent;
 
    testForm = new FormGroup({
        phones: new FormArray(
            [new FormControl('', [Validators.required, this.getPhoneLengthValidator()])],
            [this.getPhoneArrayValidator()],
        ),
    });
 
    get formData(): FormArray {
        return this.testForm.get('phones') as FormArray;
    }
 
    addPhone(): void {
        this.formData.push(new FormControl('', this.addValidators()));
    }
 
    removePhone(index: number): void {
        this.formData.removeAt(index);
 
        let n = 0;
 
        while (n <= 1 && this.formData.controls[n]) {
            this.formData.controls[n].setValidators([
                Validators.required,
                this.getPhoneLengthValidator(),
            ]);
            n++;
        }
    }
 
    addValidators(): ValidationErrors | null {
        return this.formData.controls.length < 2
            ? [Validators.required, this.getPhoneLengthValidator()]
            : null;
    }
 
    private getPhoneLengthValidator(): (
        field: AbstractControl,
    ) => ValidationErrors | null {
        return (field: AbstractControl): ValidationErrors | null =>
            field.value.length !== 12
                ? {
                      length: new TuiValidationError(this.phoneErrorContent),
                  }
                : null;
    }
 
    private getPhoneArrayValidator(): ValidatorFn {
        return ((array: FormArray): ValidationErrors | null =>
            array.controls.length < 2 ||
            (!!array.controls.filter(item => item.errors).length && array.controls.length)
                ? {
                      length: new TuiValidationError(
                          'You should add at least 2 phone number',
                      ),
                  }
                : null) as ValidatorFn;
    }
  
  userdata: UserInfo[] = [];
  form: any;
  userIdCounter: number = 1;

  toggleCheckbox = new FormGroup({
    checkboxHead: new FormControl(false),
    checkboxBody: new FormControl(false),
  });

  constructor(
    private requestService: RequestServiceService,
    private fb: FormBuilder,
  
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {
    this.form = fb.group({
      name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(2)
      ]),
      surname: new FormControl('',[
        Validators.required,
        Validators.minLength(2)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      phone: new FormControl('+7'),
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.requestService.getUserInfo().subscribe((result: any) => {
      this.userdata = result.users;
      this.addIdToUserdata();
    });
  }

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content).subscribe();
  }

  addIdToUserdata(): void {
    this.userdata.forEach(user => {
      user.id = this.userIdCounter++;
    });
  }

  addNewUser(): void {
    if (this.form.valid) {
      const newUser: UserInfo = {
        id: this.userIdCounter++,
        name: this.form.value.name,
        surname: this.form.value.surname,
        email: this.form.value.email,
        phone: this.form.value.phone,
      };
      this.userdata.push(newUser);
      this.form.reset();
    }
    console.log('Тест', this.userdata)
  }
}

interface UserInfo {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
}
