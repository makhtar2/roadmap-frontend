import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: any[] = [];
  
  // L'URL de ton backend FastAPI local
  apiUrl = 'https://api-makhtar-wade-roadmap.onrender.com/api/tasks';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.tasks = data;
        console.log('Données reçues:', data);
      },
      (error) => {
        console.error('Erreur API:', error);
      }
    );
  }

  toggleTask(task: any) {
    // Appel à l'API pour changer l'état (marquer comme fait/non fait)
    const url = `${this.apiUrl}/${task.id}/toggle`;
    
    this.http.post(url, {}).subscribe(() => {
      task.completed = !task.completed; // Mise à jour visuelle
    });
  }
}