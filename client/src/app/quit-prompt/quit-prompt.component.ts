import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-quit-prompt',
  templateUrl: './quit-prompt.component.html',
  styleUrls: ['./quit-prompt.component.css']
})
export class QuitPromptComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<QuitPromptComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
