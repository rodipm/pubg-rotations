import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements AfterViewInit, OnInit {

  //Loading Canvas and Images html elements    
  @ViewChild('myCanvas') canvasRef: ElementRef;

  //Canvas Context
  ctx: CanvasRenderingContext2D;

  //image erangel.pngð
  img;

  lastFilteredArgs;

  constructor(private bes: RequestService) { }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.bes.requestEvent
      .subscribe((event) => {
          this.refreshImage();
    });
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.img = new Image();
    this.img.src = "https://image.winudf.com/v2/image/ZXhvY29uLnB1Ymdpc2xhbmRtYXBvZmVyYW5nZWxsb290bG9jYXRpb25zX3NjcmVlbl81XzE1MTQxOTIxMDhfMDcy/screen-5.jpg?h=800&fakeurl=1&type=.jpg";
    this.lastFilteredArgs = null;
    this.refreshImage();
  }

  refreshImage() {
    if (this.bes.getFilteredResults() != null && this.bes.getFilteredResults() != this.lastFilteredArgs) {
      this.lastFilteredArgs = this.bes.getFilteredResults();
      this.paint(this.ctx);
    }
  }

  paint(ctx) {
    // the dimensions are: 8192x8192 mapped into 800x800 => real_(x,y) = position.(x,y) * 800/8192
    let factor = 800.0 / 8192.0;

    // draw erangel background
    ctx.drawImage(this.img, 0, 0);

    // setup line
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#ff0000"
    ctx.beginPath();
    ctx.moveTo(this.bes.getFilteredResults()[0].location.x * factor, this.bes.getFilteredResults()[0].location.y * factor);
    for (let i = 1; i < this.bes.getFilteredResults().length; i++) {
      ctx.lineTo(this.bes.getFilteredResults()[i].location.x * factor, this.bes.getFilteredResults()[i].location.y * factor);
    }

    ctx.lineJoin = 'miter';
    ctx.stroke();
  }
}