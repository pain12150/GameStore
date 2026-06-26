import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { GameService } from '../../services/game';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-game-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-game-form.html',
  styleUrl: './add-game-form.css',
})
export class AddGameForm implements OnInit {
  gameForm!: FormGroup;

  // Inject FormBuilder helper, GameService to save data, and Router to redirect
  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // Initialize the form controls using FormBuilder
  initForm(): void {
    this.gameForm = this.fb.group({
      // title control: initial value empty string, validators: required, and custom uppercase check
      title: ['', [Validators.required, this.titleUppercaseValidator]],
      // price control: initial value 0, validators: required and minimum value 1
      price: [0, [Validators.required, Validators.min(1)]]
    });
  }

  // Custom Validator: Checks if the first letter of the game title is capitalized
  // Returns null if valid, or a ValidationErrors object if invalid
  titleUppercaseValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) return null; // Let 'required' validator handle empty values
    
    const firstLetter = value.charAt(0);
    if (firstLetter !== firstLetter.toUpperCase()) {
      // Return error key 'titleLowercase' with true state
      return { 'titleLowercase': true };
    }
    return null;
  }

  // Getters to simplify HTML markup code checks
  get title() { return this.gameForm.get('title'); }
  get price() { return this.gameForm.get('price'); }

  // Form Submission Handler
  onSubmit(): void {
    if (this.gameForm.invalid) {
      // Mark all fields touched to trigger error styling display
      this.gameForm.markAllAsTouched();
      return;
    }

    const { title, price } = this.gameForm.value;
    this.gameService.addGame(title, price).subscribe({
      next: () => {
        // Redirect back to catalog inventory after successful insert
        this.router.navigate(['/games']);
      }
    });
  }
}
