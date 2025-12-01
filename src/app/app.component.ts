import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: any[] = [];
  
  // Variables pour le formulaire
  newWeek: string = 'Semaine 3';
  newTitle: string = '';

  // Mets ton URL Render ici (ou localhost pour tester)
  //apiUrl = 'https://api-makhtar-wade-roadmap.onrender.com/api/tasks';
  apiUrl = 'http://127.0.0.1:8000/api/tasks';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.tasks = data;
      // On trie pour avoir les semaines dans l'ordre (optionnel)
      this.tasks.sort((a, b) => a.id - b.id);
    });
  }

  toggleTask(task: any) {
    this.http.post(`${this.apiUrl}/${task.id}/toggle`, {}).subscribe(() => {
      task.completed = !task.completed;
    });
  }

  addTask() {
    if (!this.newTitle.trim()) return; // On empêche les titres vides

    const newTask = {
      week: this.newWeek,
      title: this.newTitle
    };

    this.http.post(this.apiUrl, newTask).subscribe((createdTask) => {
      this.tasks.push(createdTask); // Ajout visuel immédiat
      this.newTitle = ''; // On vide le champ
    });
  }

  deleteTask(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      // On retire l'élément de la liste visuelle
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }
}