<template>
  <div>
    <div style="text-align:center;">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <b><h1>Customer Profile</h1></b>
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-list>
            <mat-list-item>First Name: {{ profile?.firstname }}</mat-list-item>
            <mat-list-item>Last Name: {{ profile?.lastname }}</mat-list-item>
            <mat-list-item>Email: {{ profile?.email }}</mat-list-item>
            <mat-list-item>Telephone: {{ profile?.telephone }}</mat-list-item>
            <mat-list-item>
              <button mat-raised-button="" color="warn" (click)="Delete()">
                Delete
              </button>
              &nbsp;&nbsp;
              <button
                mat-raised-button=""
                color="primary"
                *ngif="apiService.isAuthenticated"
                (click)="GotoUpdate()"
              >
                Update
              </button>
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
