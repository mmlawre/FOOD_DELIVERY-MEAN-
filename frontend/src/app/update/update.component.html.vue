<template>
  <div>
    <h1 style="text-align:center;">Update Here</h1>
    <form class="example-form" style="text-align:center;" *ngif="userData">
      <div>
        <mat-form-field class="example-full-width">
          <mat-label>First name</mat-label>
          <input
            matinput=""
            [(ngmodel)]="userData.firstname"
            name="firstname"
            placeholder="Ex. John"
            required=""
          />
        </mat-form-field>
      </div>
      <div>
        <mat-form-field class="example-full-width">
          <mat-label>Last name</mat-label>
          <input
            matinput=""
            [(ngmodel)]="userData.lastname"
            name="lastname"
            placeholder="Ex. Doe"
            required=""
          />
        </mat-form-field>
      </div>
      <div>
        <mat-form-field class="example-full-width">
          <mat-label>Email</mat-label>
          <input
            matinput=""
            [(ngmodel)]="userData.email"
            name="email"
            placeholder="Ex.JohnDoe@email.com"
            required=""
            type="email"
          />
        </mat-form-field>
      </div>
      <div>
        <mat-form-field class="example-full-width">
          <mat-label>Telephone</mat-label>
          <span matprefix="">+1 &nbsp;</span>
          <input
            type="tel"
            matinput=""
            [(ngmodel)]="userData.telephone"
            name="telephone"
            placeholder="555-555-1234"
            required=""
          />
          <mat-icon matsuffix=""></mat-icon>
        </mat-form-field>
      </div>
      <button mat-raised-button="" color="primary" (click)="update()">
        Update
      </button>
    </form>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
