import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { WishListService, SessionService } from '../shared/services/';
import { IUser } from '../shared/interfaces/';

@Component({
  template: require('./wish-list-form.component.html')
})
export class WishListFormComponent implements OnInit {

  public form: FormGroup;
  public user: IUser;
  public isSubmitted: boolean = false;
  public isEdit: boolean = false;
  public isReady: boolean = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private wishListService: WishListService,
    private sessionService: SessionService) { }

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.defineFormFields();
    this.assignFormData();
  }

  create(): void {
    let formData = this.form.value;
    delete formData._id;
    this.wishListService.create(formData)
      .then(data => {
        this.isSubmitted = false;
        this.router.navigate(['/wish-lists']);
      })
      .catch(reason => {
        this.isSubmitted = false;
        alert("Error: " + reason);
      });
  }

  delete(): void {
    this.isSubmitted = true;
    this.wishListService.delete(this.form.value._id)
      .then(data => {
        this.isSubmitted = false;
        this.router.navigate(['/wish-lists']);
      })
      .catch(reason => {
        this.isSubmitted = false;
        alert("Error: " + reason);
      });
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    this.isSubmitted = true;
    if (this.form.value._id) {
      this.update();
    } else {
      this.create();
    }
  }

  update(): void {
    let id = this.form.value._id;
    let formData = this.form.value;
    this.wishListService.update(id, formData)
      .then(data => {
        this.isSubmitted = false;
        this.router.navigate(['/wish-lists']);
      })
      .catch(reason => {
        this.isSubmitted = false;
        alert("Error: " + reason);
      });
  }

  // Define the form fields.
  private defineFormFields(): void {
    let user = this.sessionService.getUser();
    this.form = this.formBuilder.group({
      _id: [''],
      _user: [user._id],
      name: ['', [<any>Validators.required, <any>Validators.minLength(2)]]
    });
  }

  // Retrieve model from the database, if editing.
  private assignFormData(): void {
    this.route.params.forEach((params: Params) => {
      let id: string = params['id'];
      if (id) {
        this.isEdit = true;
        this.wishListService.getById(id, false).then(data => {

          // Redirect if user doesn't own the data.
          if (data._user !== this.user._id) {
            this.router.navigate(['/']);
            return;
          }

          // Prefill the form if we're editing.
          (<FormGroup>this.form).patchValue(data, { onlySelf: true });
          this.isReady = true;
        });
      }
    });
  }
}
