import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  studentForm !: FormGroup
  actionBtn: String = "Save"
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogFef: MatDialogRef<DialogComponent>) {

  }
  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      number: ['', Validators.required],
      gender: ['', Validators.required]

    })

    if (this.editData) {
      this.actionBtn="Update";
      this.studentForm.controls['name'].setValue(this.editData.name);
      this.studentForm.controls['age'].setValue(this.editData.age);
      this.studentForm.controls['number'].setValue(this.editData.number);
      this.studentForm.controls['gender'].setValue(this.editData.gender);
    }

  }
  addStudent() {
   if(this.editData){
    if (this.studentForm.valid) {
      this.api.postStudent(this.studentForm.value)
        .subscribe({
          next: (res) => {
            alert("Student Added Successfully")
          },
          error: () => {
            alert("Error while adding the student")
          }
        })
    }else{
      this.updateStudent()
    }

   }

  }
  updateStudent() {
    throw new Error('Method not implemented.');
  }

}

