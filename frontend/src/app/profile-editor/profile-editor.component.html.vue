<template>
  <div>
    <form (ngsubmit)="onSubmit()">
      <label>
        Item Name:
        <!-- <input type="text" formControlName="itemName" [(ngModel)]="itemName" /> -->
        <input type="text" formcontrolname="itemName" />
        <!-- <p>{{ itemName }}</p> -->
      </label>
      <br />
      <label>
        Item Category:
        <input type="text" formcontrolname="itemCat" />
      </label>
      <br />
      <br />
      <label>
        Item Description:
        <input
          type="text"
          formcontrolname="description"
          (mouseover)="labelMouseOver()"
        />
      </label>
      <label>
        Price:
        <input type="text" formcontrolname="price" />
      </label>
      <label>
        Stock:
        <input type="text" formcontrolname="stock" />
      </label>
      <button type="submit" [disabled]="!profileForm.valid">Submit</button>

      <!-- <p>Form Status: {{ profileForm.status }}</p> -->
      <p>Form Status:</p>
    </form>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
