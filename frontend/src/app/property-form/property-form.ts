import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PropertyType } from '../models/property-type.enum';
import { ImageUploadComponent } from '';

@Component({
  selector: 'app-property-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './property-form.html',
  styleUrls: ['./property-form.css']
})
export class PropertyFormComponent implements OnInit {
  propertyForm!: FormGroup;
  propertyTypes = Object.values(PropertyType);


  showImageUpload: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.propertyForm = this.fb.group({
      title: ['', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(100)
      ]], 
      
      description: [''],
      
      price: [null, [
        Validators.required, 
        Validators.min(0.01)
      ]], 
      
      availableVacancies: [null, [
        Validators.required, 
        Validators.min(1)
      ]], 
      
      type: [null, [Validators.required]],

      address: this.fb.group({
        street: ['', Validators.required],
        district: ['', Validators.required],
        cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]] 
      }),
      acceptAnimals: [false], 
      gender: ['ANY'] 
    });
  }

  toggleImageUpload(): void {
    this.showImageUpload = !this.showImageUpload;
  }

  onSubmit(): void {
    if (this.propertyForm.valid) {
      console.log('Dados do formulário:', this.propertyForm.value);

    } else {
      this.propertyForm.markAllAsTouched();
    }
  }

  getLabelForType(type: string): string {
    switch (type) {
      case PropertyType.HOUSE: return 'Casa';
      case PropertyType.APARTMENT: return 'Apartamento';
      case PropertyType.STUDIO: return 'República'; 
      case PropertyType.ROOM: return 'Quarto';
      default: return type;
    }
  }
}