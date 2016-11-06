import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { WishListService } from '../shared/services/wish-list.service';


@Component({
  selector: 'wish-list-form',
  template: require('./wish-list-form.component.html')
})
export class WishListFormComponent implements OnInit {

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public isEdit: boolean = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private wishListService: WishListService) { }

  ngOnInit(): void {
    this.defineFormFields();
    this.assignFormData();
  }

  create(): void {
    let formData = this.form.value;
    delete formData._id;
    this.wishListService.create(formData)
      .then(data => {
        this.isSubmitted = false;
        alert("Success!");
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
        alert("Success!");
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
        alert("Success!");
      })
      .catch(reason => {
        this.isSubmitted = false;
        alert("Error: " + reason);
      });
  }

  // Define the form fields.
  private defineFormFields(): void {
    this.form = this.formBuilder.group({
      _id: [''],
      name: ['', [<any>Validators.required, <any>Validators.minLength(5)]]
    });
  }

  // Retrieve model from the database, if editing.
  private assignFormData(): void {
    this.route.params.forEach((params: Params) => {
      let id: string = params['id'];
      if (id) {
        this.isEdit = true;
        this.wishListService.getById(id).then(data => {
          (<FormGroup>this.form).patchValue(data, { onlySelf: true });
        });
      }
    });
  }
}
