import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import {MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit{
 
  displayedColumns: string[] = [
    'rank', 
    'name', 
    'batch', 
    'overallRating',
    'codeforcesRating',
    'codechefRating',
    'atcoderRating',
    'solveCount',
    'lastContestDate',
    'lastContestDelta',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _userService:UserService ){}
  ngOnInit(): void {
    this.getUserList();
  }
  getUserList(){
    this._userService.getUserList().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteUser(id: number){
    this._userService.deleteUser(id).subscribe({
      next:(res)=>{
        alert('User Deleted!');
        this.getUserList();
      },
      error: console.log
    })
  }
}



