import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as d3 from 'd3';
import { IRing } from 'src/app/models/ring.model';

@Component({
  selector: 'app-participant-ring',
  templateUrl: './participant-ring.component.html',
  styleUrls: ['./participant-ring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipantRingComponent implements OnChanges {
  _ring: IRing = [];

  @Input()
  set ring(value: IRing) {
    this._ring = value;
  }

  get ring(): IRing {
    return this._ring;
  }

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
  totalLabel!: { text: (arg0: number) => void }; // SVG label for total
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
  pie = d3
    .pie()
    //    .startAngle(-90 * Math.PI / 180)
    //    .endAngle(-90 * Math.PI / 180 + 2 * Math.PI)
    .value((d: any) => d.value)
    .padAngle(0.01)
    .sort(null);
  arc: any;

  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ring'] || changes['withFire'] || changes['withArrow']) {
      let ring: IRing = changes['ring'].currentValue;

      this.updateChart(ring);
      let ringLabels = ring.map((p) => p[0].username_or_name);
      this.updateLabels(ringLabels);

      this.updateChart(ring);
    }

    if (changes['ringLabels']) {
      this.updateLabels(changes['ringLabels'].currentValue);
    }
  }

  private setColorScale() {
    this.colorScale = d3
      .scaleLinear()
      .domain([1, 3.5, 6])
      // @ts-ignore
      .range(['#2c7bb6', '#ffffbf', '#d7191c'])
      // @ts-ignore
      .interpolate(d3.interpolateHcl);
  }

  public updateChart(data: any[]) {
    if (!this.svg) {
      this.createChart(data);
      return;
    }

    this.processPieData(data, false);
    this.updateState();
  }

  private createChart(data: any[]) {
    this.processPieData(data);

    this.removeExistingChartFromParent();
    this.setChartDimensions();
    if (this.withFire) {
      this.addFire();
    }

    this.setColorScale();
    this.addGraphicsElement();
    this.setupArcGenerator();
    this.addSlicesToTheDonut();
    this.addLabelsToTheDonut();
    this.defineMarkers();
    if (this.showLogo) {
      this.addCenterLogo();

      if (this.withArrow) {
        this.addCircleArrow();
      }
    } else {
      //      this.addCenterLabel();
    }
  }

  private processPieData(data: any, initial = true) {
    let size = 100 / data.length;

    let newData = data.map((val: any) => {
      val.value = size;
      return val;
    });

    this.rawData = data;

    // @ts-ignore
    this.pieData = this.pie(newData);
    if (initial) {
      this.pieDataPrevious = this.pieData;
    }
  }

  public updateState() {
    this.g
      .selectAll('path')
      .data(this.pie(this.pieData))
      .style('opacity', (d: any) => {
        if (!d.data.data[2]) return 0.25;
        return 1;
      })
      .style('stroke-width', (d: any) => {
        if (!d.data.data[2]) return 1;
        return 0;
      });
  }

  private setChartDimensions() {
    let viewBoxHeight = 430;
    let viewBoxWidth = 430;
    this.svg = d3
      .select(this.hostElement)
      .append('svg')
      .lower()
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight);
  }

  private addGraphicsElement() {
    this.g = this.svg.append('g').attr('transform', 'translate(215,215)');
  }

  private addFire() {
    this.svg
      .append('image')
      .attr('href', '/assets/fire.webp')
      .attr('height', 500)
      .attr('width', 500)
      .attr('x', -40)
      .attr('y', -40);
  }

  private addCenterLogo() {
    let w = 350;
    let h = 350;

    this.g
      .append('image')
      .attr('xlink:href', '/assets/roflogo.png')
      .attr('width', w)
      .attr('height', h)
      .attr('x', -w / 2)
      .attr('y', -h / 2);
  }

  private defineMarkers() {
    let markerBoxWidth = 20;
    let markerBoxHeight = 20;
    const refX = markerBoxWidth / 2;
    const refY = markerBoxHeight / 2;
    const arrowPoints = [
      [0, 0],
      [0, 20],
      [20, 10],
    ];

    let defs = this.g.append('svg:defs');

    defs
      .append('svg:marker')
      .attr('id', 'marker_arrow')
      .attr('refX', refX)
      .attr('refY', refY)
      .attr('markerWidth', markerBoxWidth)
      .attr('markerHeight', markerBoxHeight)
      .attr('markerUnits', 'strokeWidth')
      .attr('orient', 'auto-start-reverse')
      .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
      .append('path')
      /* @ts-ignore */
      .attr('d', d3.line()(arrowPoints))
      .style('fill', '#fff')
      .append('svg:marker')
      .attr('id', 'chevron')
      .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
      .attr('refX', refX)
      .attr('refY', refY)
      .attr('markerUnits', 'userSpaceOnUse')
      .attr('markerWidth', markerBoxWidth)
      .attr('markerHeight', markerBoxHeight)
      .attr('orient', 'auto')
      .append('path')
      /* @ts-ignore */
      .attr('d', 'M0 0 10 0 20 10 10 20 0 20 10 10Z')
      .style('fill', '#fff');

    defs
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 5)
      .attr('refY', -2)
      .attr('markerUnits', 'strokeWidth')
      .attr('markerWidth', 36)
      .attr('markerHeight', 36)
      .attr('orient', '75deg')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .style('fill', '#fff');
  }

  private addCircleArrow() {
    this.innerRadius = 140;
    this.radius = 140;
    let width = 350;
    let pi = Math.PI;

    let circleArrow = d3
      .arc()
      .innerRadius((width * 0.75) / 2)
      .outerRadius((width * 0.75) / 2 + 15)
      .startAngle(80 * (pi / 180))
      .endAngle(-80 * (pi / 180));

    this.g
      .append('path')
      .attr('d', circleArrow)
      .attr('marker-end', (d: any, i: any) => {
        return 'url(#arrowhead)';
      })
      .style('fill', '#fff');
  }

  private setupArcGenerator() {
    this.innerRadius = 50;
    this.radius = 80;
    let width = 430;
    this.arc = d3
      .arc()
      .innerRadius((width * 0.75) / 2)
      .outerRadius((width * 0.75) / 2 + 30);
  }

  private addSlicesToTheDonut() {
    this.slices = this.g
      .selectAll('allSlices')
      .data(this.pie(this.pieData))
      .enter()
      .append('path')
      .attr('class', 'donutArcSlices')
      .attr('d', this.arc)
      .attr('fill', (datum: any, index: any) => {
        return this.colorScale(`${index}`);
      })
      .style('opacity', (datum: any, index: any) => {
        if (!datum.data.data[2]) return 0.25;
        return 1;
      })
      .attr('stroke-width', (datum: any) => {
        return Number(!datum.data.data[2]) * 2;
      })
      .attr('stroke', (datum: any) => {
        return !datum.data.data[2] ? 'yellow' : 'yellow';
      });
  }

  private updateLabels(data: any[]) {
    this.labels.each((_datum: any, index: number, n: Array<any>) => {
      d3.select(n[index]).text(data[index]);
    });
  }

  private addLabelsToTheDonut() {
    let self = this;
    this.g
      .selectAll('.donutArcSlices')

      .each(function (datum: any, index: any) {
        //A regular expression that captures all in between the start of a string (denoted by ^) and a capital letter L
        //The letter L denotes the start of a line segment
        //The "all in between" is denoted by the .+?
        //where the . is a regular expression for "match any single character except the newline character"
        //the + means "match the preceding expression 1 or more times" (thus any single character 1 or more times)
        //the ? has to be added to make sure that it stops at the first L it finds, not the last L
        //It thus makes sure that the idea of ^.*L matches the fewest possible characters
        //For more information on regular expressions see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        let firstArcSection = /(^.+?)L/;

        // @ts-ignore
        let newArc = firstArcSection.exec(d3.select(this).attr('d'))[1];
        newArc = newArc.replace(/,/g, ' ');

        //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2)
        //flip the end and start position
        let cond = datum.endAngle > 90;
        if (
          datum.endAngle > (90 * Math.PI) / 180 &&
          datum.endAngle < (300 * Math.PI) / 180
        ) {
          var startLoc = /M(.*?)A/, //Everything between the first capital M and first capital A
            middleLoc = /A(.*?)0 0 1/, //Everything between the first capital A and 0 0 1
            endLoc = /0 0 1 (.*?)$/; //Everything between the first 0 0 1 and the end of the string (denoted by $)
          //Flip the direction of the arc by switching the start en end point (and sweep flag)
          //of those elements that are below the horizontal line

          // @ts-ignore
          var newStart = endLoc.exec(newArc)[1];
          // @ts-ignore
          var newEnd = startLoc.exec(newArc)[1];
          // @ts-ignore
          var middleSec = middleLoc.exec(newArc)[1];

          //Build up the new arc notation, set the sweep-flag to 0
          newArc = 'M' + newStart + 'A' + middleSec + '0 0 0 ' + newEnd;
        } //if

        self.g
          .append('path')
          .attr('class', 'hiddenDonutArcs')
          .attr('id', 'donutArc' + index)
          .attr('d', newArc)
          .style('fill', 'none');
      });

    this.labels = this.g
      .selectAll('.donutText')
      .data(this.pieData)
      .enter()
      .append('text')
      .attr('class', 'donutText')
      //Move the labels below the arcs for slices with an end angle > than 90 degrees
      .attr('dy', function (datum: any, i: number) {
        // if (d.endAngle < 240 && d.endAngle > 90)
        //   return (d.endAngle > 90 * Math.PI/180 ? 18 : -11);
        // else
        let cond =
          datum.endAngle > (90 * Math.PI) / 180 &&
          datum.endAngle < (300 * Math.PI) / 180;
        return cond ? 18 : -11;
      })
      //.attr("dy", -13)
      .append('textPath')
      .attr('startOffset', '50%')
      .style('text-anchor', 'middle')
      .style('fill', '#ffffff')
      .attr('xlink:href', function (d: any, i: number) {
        return '#donutArc' + i;
      })
      .text((d: any) => {
        return d.data.name;
      });
  }

  private removeExistingChartFromParent() {
    // !!!!Caution!!!
    // Make sure not to do;
    //     d3.select('svg').remove();
    // That will clear all other SVG elements in the DOM
    d3.select(this.hostElement).select('svg').remove();
  }
}
