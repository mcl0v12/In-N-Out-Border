import { defineStore } from "pinia";

interface PolygonState {
  widthFactor: number;
  heightFactor: number;
  bluntnessFactor: number;
  cornerSize: number;
  spacingFactor: number;
  strokeWidthFactor: number;
  clipPathCreated: boolean;
  roundUpIntegers: boolean;
  decimalPlaces: number;
  cornerInsetAngle: number;
  useTailwindCSS: boolean;
}

export const usePolygonStore = defineStore("polygonStore", {
  state: (): PolygonState => ({
    widthFactor: 200,
    heightFactor: 200,
    bluntnessFactor: 0.8,
    cornerSize: 1,
    spacingFactor: 0.5,
    strokeWidthFactor: 1,
    clipPathCreated: true,
    roundUpIntegers: false,
    decimalPlaces: 5,
    cornerInsetAngle: 0,
    useTailwindCSS: false,
  }),

  getters: {
    outerPolygonPoints(state: PolygonState): string {
      const width = state.widthFactor;
      const height = state.heightFactor;

      const offset = state.bluntnessFactor * 15;
      const strokeWidthOffset = (state.strokeWidthFactor - 1) * 0.5;

      // TODO for advanced settings
      const cornerInset = state.cornerInsetAngle * Math.min(width, height);

      const startAngleDegrees = 135;
      const angleChange = state.cornerInsetAngle * 30;
      const newAngleDegrees = startAngleDegrees - angleChange;
      const newAngleRadians = (newAngleDegrees * Math.PI) / 180;

      const insetXAdjustment =
        cornerInset *
        (1 - Math.cos(newAngleRadians)) *
        (state.strokeWidthFactor / 5);
      const insetYAdjustment =
        cornerInset * Math.sin(newAngleRadians) * (state.strokeWidthFactor / 5);
      //...

      const points = [
        {
          x: 1 + offset + strokeWidthOffset + cornerInset + insetXAdjustment,
          y: 1 + strokeWidthOffset,
        },
        {
          x:
            width -
            1 -
            offset -
            strokeWidthOffset -
            cornerInset -
            insetXAdjustment,
          y: 1 + strokeWidthOffset,
        },
        {
          x: width - 1 - strokeWidthOffset,
          y: 1 + offset + strokeWidthOffset + insetYAdjustment,
        },
        {
          x: width - 1 - strokeWidthOffset,
          y: height - 1 - offset - strokeWidthOffset - insetYAdjustment,
        },
        {
          x:
            width -
            1 -
            offset -
            strokeWidthOffset -
            cornerInset -
            insetXAdjustment,
          y: height - 1 - strokeWidthOffset,
        },
        {
          x: 1 + offset + strokeWidthOffset + cornerInset + insetXAdjustment,
          y: height - 1 - strokeWidthOffset,
        },
        {
          x: 1 + strokeWidthOffset,
          y: height - 1 - offset - strokeWidthOffset - insetYAdjustment,
        },
        {
          x: 1 + strokeWidthOffset,
          y: 1 + offset + strokeWidthOffset + insetYAdjustment,
        },
      ];

      return points
        .map((p) => {
          const x = state.roundUpIntegers
            ? Number(p.x.toFixed(state.decimalPlaces))
            : p.x;
          const y = state.roundUpIntegers
            ? Number(p.y.toFixed(state.decimalPlaces))
            : p.y;
          return `${x},${y}`;
        })
        .join(" ");
    },

    innerPolygonPoints(state: PolygonState): string {
      const width = state.widthFactor;
      const height = state.heightFactor;

      const baseOffset = state.bluntnessFactor * 15;
      const offset = baseOffset * state.cornerSize;
      const strokeWidthOffset = (state.strokeWidthFactor - 1) * 0.5;

      const spacing = state.spacingFactor * 5;

      // TODO for advanced settings
      const cornerInset = state.cornerInsetAngle * Math.min(width, height);

      const startAngleDegrees = 135;
      const angleChange = state.cornerInsetAngle * 30;
      const newAngleDegrees = startAngleDegrees - angleChange;
      const newAngleRadians = (newAngleDegrees * Math.PI) / 180;

      const insetXAdjustment =
        cornerInset *
        (1 - Math.cos(newAngleRadians)) *
        (state.strokeWidthFactor / 5);
      const insetYAdjustment =
        cornerInset * Math.sin(newAngleRadians) * (state.strokeWidthFactor / 5);
      //...

      const points = [
        {
          x:
            5 +
            spacing +
            offset +
            strokeWidthOffset +
            cornerInset +
            insetXAdjustment,
          y: 5 + spacing + strokeWidthOffset,
        },
        {
          x:
            width -
            5 -
            spacing -
            offset -
            strokeWidthOffset -
            cornerInset -
            insetXAdjustment,
          y: 5 + spacing + strokeWidthOffset,
        },
        {
          x: width - 5 - spacing - strokeWidthOffset,
          y: 5 + spacing + offset + strokeWidthOffset + insetYAdjustment,
        },
        {
          x: width - 5 - spacing - strokeWidthOffset,
          y:
            height -
            5 -
            spacing -
            offset -
            strokeWidthOffset -
            insetYAdjustment,
        },
        {
          x:
            width -
            5 -
            spacing -
            offset -
            strokeWidthOffset -
            cornerInset -
            insetXAdjustment,
          y: height - 5 - spacing - strokeWidthOffset,
        },
        {
          x:
            5 +
            spacing +
            offset +
            strokeWidthOffset +
            cornerInset +
            insetXAdjustment,
          y: height - 5 - spacing - strokeWidthOffset,
        },
        {
          x: 5 + spacing + strokeWidthOffset,
          y:
            height -
            5 -
            spacing -
            offset -
            strokeWidthOffset -
            insetYAdjustment,
        },
        {
          x: 5 + spacing + strokeWidthOffset,
          y: 5 + spacing + offset + strokeWidthOffset + insetYAdjustment,
        },
      ];

      return points
        .map((p) => {
          const x = state.roundUpIntegers
            ? Number(p.x.toFixed(state.decimalPlaces))
            : p.x;
          const y = state.roundUpIntegers
            ? Number(p.y.toFixed(state.decimalPlaces))
            : p.y;
          return `${x},${y}`;
        })
        .join(" ");
    },

    clipPathPolygonPoints(state: PolygonState): string {
      const width = state.widthFactor;
      const height = state.heightFactor;

      const baseOffset = state.bluntnessFactor * 15;
      const offset = baseOffset * state.cornerSize;
      const defaultOffset = 0.5 * state.strokeWidthFactor;
      const strokeWidthOffset = (state.strokeWidthFactor - 1) * 0.5;
      const cutFactor = 0.285 * state.strokeWidthFactor;

      const spacing = state.spacingFactor * 5;

      // TODO for advanced settings
      const cornerInset = state.cornerInsetAngle * Math.min(width, height);

      const startAngleDegrees = 135;
      const angleChange = state.cornerInsetAngle;
      const newAngleDegrees = startAngleDegrees - angleChange;
      const newAngleRadians = (newAngleDegrees * Math.PI) / 180;

      const sizeFactor = Math.sqrt((width * height) / (100 * 100));
      const aspectRatio = width / height;

      const insetXAdjustmentFactor =
        0.946 + 0.00296 * (sizeFactor - 1) + 0.002 * (aspectRatio - 1);
      const insetYAdjustmentFactor =
        1.107 - 0.00467 * (sizeFactor - 1) - 0.002 * (aspectRatio - 1);

      const insetXAdjustment =
        cornerInset *
        (1 - Math.cos(newAngleRadians)) *
        (state.strokeWidthFactor / 5) *
        insetXAdjustmentFactor;
      const insetYAdjustment =
        cornerInset *
        Math.sin(newAngleRadians) *
        (state.strokeWidthFactor / 5) *
        insetYAdjustmentFactor;
      //...

      const innerPoints = [
        {
          x:
            5 +
            spacing +
            offset +
            strokeWidthOffset +
            defaultOffset +
            cornerInset -
            cutFactor +
            insetXAdjustment,
          y: 5 + spacing + strokeWidthOffset + defaultOffset,
        },
        {
          x:
            width -
            5 -
            spacing -
            offset -
            strokeWidthOffset -
            defaultOffset -
            cornerInset +
            cutFactor -
            insetXAdjustment,
          y: 5 + spacing + strokeWidthOffset + defaultOffset,
        },
        {
          x: width - 5 - spacing - strokeWidthOffset - defaultOffset,
          y:
            5 +
            spacing +
            offset +
            strokeWidthOffset +
            defaultOffset +
            insetYAdjustment -
            cutFactor,
        },
        {
          x: width - 5 - spacing - strokeWidthOffset - defaultOffset,
          y:
            height -
            5 -
            spacing -
            offset -
            strokeWidthOffset -
            defaultOffset -
            insetYAdjustment +
            cutFactor,
        },
        {
          x:
            width -
            5 -
            spacing -
            offset -
            strokeWidthOffset -
            defaultOffset -
            cornerInset +
            cutFactor -
            insetXAdjustment,
          y: height - 5 - spacing - strokeWidthOffset - defaultOffset,
        },
        {
          x:
            5 +
            spacing +
            offset +
            strokeWidthOffset +
            defaultOffset +
            cornerInset -
            cutFactor +
            insetXAdjustment,
          y: height - 5 - spacing - strokeWidthOffset - defaultOffset,
        },
        {
          x: 5 + spacing + strokeWidthOffset + defaultOffset,
          y:
            height -
            5 -
            spacing -
            offset -
            strokeWidthOffset -
            defaultOffset -
            insetYAdjustment +
            cutFactor,
        },
        {
          x: 5 + spacing + strokeWidthOffset + defaultOffset,
          y:
            5 +
            spacing +
            offset +
            strokeWidthOffset +
            defaultOffset +
            insetYAdjustment -
            cutFactor,
        },
      ];

      return innerPoints
        .map((p) => {
          const x = state.roundUpIntegers
            ? Number(p.x.toFixed(state.decimalPlaces))
            : p.x;
          const y = state.roundUpIntegers
            ? Number(p.y.toFixed(state.decimalPlaces))
            : p.y;
          return `${x},${y}`;
        })
        .join(" ");
    },
  },

  actions: {
    updateFactors(
      width: number,
      height: number,
      bluntness: number,
      cornerInset: number,
      corner: number,
      spacing: number,
      strokeWidth: number,
      decimalPlaces: number,
      roundUpIntegers: boolean,
      useTailwindCSS: boolean
    ) {
      this.widthFactor = width;
      this.heightFactor = height;
      this.bluntnessFactor = bluntness;
      this.cornerInsetAngle = cornerInset;
      this.cornerSize = corner;
      this.spacingFactor = spacing;
      this.strokeWidthFactor = strokeWidth;
      this.decimalPlaces = decimalPlaces;
      this.roundUpIntegers = roundUpIntegers;
      this.useTailwindCSS = useTailwindCSS;
    },
    createClipPath() {
      this.clipPathCreated = true;
    },
    removeClipPath() {
      this.clipPathCreated = false;
    },
  },
});
