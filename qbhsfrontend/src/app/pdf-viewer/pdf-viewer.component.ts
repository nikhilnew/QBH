import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
  pdfSrc: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/users/pdf', { responseType: 'blob' }).subscribe((blob) => {
      this.pdfSrc = URL.createObjectURL(blob);
    });
  }
}
