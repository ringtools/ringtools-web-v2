import { Component, ElementRef, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-participant-ring',
  templateUrl: './participant-ring.component.html',
  styleUrls: ['./participant-ring.component.scss']
})
export class ParticipantRingComponent {
  @Input() data: any[] = [];
  @Input() ringName: string = '';
  @Input() showLogo: boolean = false;
  @Input() withFire: boolean = false;
  @Input() withArrow: boolean = true;
  @Input() ringLabels: string[] = [];
  
  hostElement: any; // Native element hosting the SVG container
  svg: any; // Top level SVG element
  g: any; // SVG Group element
  innerRadius!: number; // Inner radius of donut chart
  // Inner radius of donut chart
  radius!: number; // Outer radius of donut chart
  // Outer radius of donut chart
  slices!: any;
  // Donut chart slice elements
  labels!: any; // SVG data label elements
  // SVG data label elements
  totalLabel!: { text: (arg0: number) => void; }; // SVG label for total
  // SVG label for total
  rawData!: any[]; // Raw chart values array
  // Raw chart values array
  total!: number; // Total of chart values
  // Total of chart values
  colorScale!: any; // D3 color provider
  // D3 color provider
  pieData: any; // Arc segment parameters for current data set
  pieDataPrevious: any; // Arc segment parameters for previous data set - used for transitions
  colors = d3.scaleOrdinal(d3.schemeCategory10);
  pie = d3.pie()
    //    .startAngle(-90 * Math.PI / 180)
    //    .endAngle(-90 * Math.PI / 180 + 2 * Math.PI)
    .value((d: any) => d.value)
    .padAngle(.01)
    .sort(null);
  arc: any;


  constructor(private elRef: ElementRef) { 
    this.hostElement = this.elRef.nativeElement;

    this.setChartDimensions();
    this.addFire();
    this.addGraphicsElement();
    this.defineMarkers();
    this.addCenterLogo();
    this.addCircleArrow();
  }

  private setChartDimensions() {
    let viewBoxHeight = 430;
    let viewBoxWidth = 430;
    this.svg = d3.select(this.hostElement).append('svg').lower()
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight);
  }

  private addGraphicsElement() {
    this.g = this.svg.append("g")
      .attr("transform", "translate(215,215)");
  }

  private addFire() {
    this.svg.append('image').attr('href', '/assets/fire.webp')
    .attr('height', 500)
    .attr('width', 500)
    .attr('x', -40)
    .attr('y', -40);
  }

  private addCenterLogo() {
    let w = 350;
    let h = 350;

    this.g.append("image")
      .attr("xlink:href", "/assets/roflogo.png")
      .attr("width", w).attr("height", h)
      .attr("x", -w/2).attr("y", -h/2)
  }

  private defineMarkers() {
    let markerBoxWidth = 20
    let markerBoxHeight = 20
    const refX = markerBoxWidth / 2;
    const refY = markerBoxHeight / 2;
    const arrowPoints = [[0, 0], [0, 20], [20, 10]];

    let defs = this.g.append("svg:defs");

    defs.append("svg:marker")
      .attr("id", "marker_arrow")
      .attr("refX", refX)
      .attr("refY", refY)
      .attr("markerWidth", markerBoxWidth)
      .attr("markerHeight", markerBoxHeight)
      .attr("markerUnits", "strokeWidth")
      .attr("orient", "auto-start-reverse")
      .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
      .append("path")
      /* @ts-ignore */
      .attr("d", d3.line()(arrowPoints))
      .style("fill", "#fff")
      .append("svg:marker")
      .attr("id", "chevron")
      .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
      .attr("refX", refX)
      .attr("refY", refY)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("markerWidth", markerBoxWidth)
      .attr("markerHeight", markerBoxHeight)
      .attr("orient", "auto")
      .append("path")
      /* @ts-ignore */
      .attr("d", 'M0 0 10 0 20 10 10 20 0 20 10 10Z')
      .style("fill", "#fff")

    defs.append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", -2)
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", 36)
      .attr("markerHeight", 36)
      .attr("orient", "75deg")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .style("fill", "#fff")
      ;
  }

  private addCircleArrow() {
    this.innerRadius = 140;
    this.radius = 140;
    let width = 350;
    let pi = Math.PI;

    let circleArrow = d3.arc()
      .innerRadius(width * 0.75 / 2)
      .outerRadius(width * 0.75 / 2 + 15)
      .startAngle(80 * (pi / 180))
      .endAngle(-80 * (pi / 180))

    this.g
      .append('path')
      .attr('d', circleArrow)
      // .attr('marker-start', (d, i) => {
      //   return 'url(#arrowhead)'
      // })
      .attr('marker-end', (d: any, i: any) => {
        return 'url(#arrowhead)'
      })
      .style("fill", "#fff");
  }
}
