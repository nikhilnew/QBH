import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  users = [];
displayedColumns: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get('http://localhost:3000/users').subscribe((data: any) => {
      this.users = data;
    });
  }

  deleteUser(id: number) {
    this.http.delete(`http://localhost:3000/users/${id}`).subscribe(() => {
      this.loadUsers();
    });
  }


  editUser(id: number) {
    this.http.delete(`http://localhost:3000/users/${id}`).subscribe(() => {
      this.loadUsers();
    });
  }

  generatePdf() {
    this.http.get('http://localhost:3000/users/pdf', { responseType: 'blob' }).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'users.pdf';
      link.click();
    });
  }
}
