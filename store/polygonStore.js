// --------------
// /store/polygonStore.js
// --------------

import { defineStore } from "pinia";

export const usePolygonStore = defineStore("polygonStore", {
  state: () => ({
    widthFactor: 250,
    heightFactor: 250,
    bluntnessFactor: 0.5,
    spacingFactor: 1,
    cornerSize: 1,
    strokeWidthFactor: 1,
    clipPathCreated: true,
  }),
  
  getters: {
    // --------------
    // outerPolygon
    // --------------
    outerPolygonPoints(state) {
      // Offset basierend auf bluntnessFactor für abgerundete Ecken
      const offset = state.bluntnessFactor * 15;
      const width = state.widthFactor;
      const height = state.heightFactor;

      // Berücksichtigt den Einfluss der Strichbreite auf die Position der Ecken
      const strokeWidthOffset = (state.strokeWidthFactor - 1) * 1.5;

      const points = [
        { x: 1 + offset + strokeWidthOffset, y: 1 + strokeWidthOffset },
        { x: width - 1 - offset - strokeWidthOffset, y: 1 + strokeWidthOffset },
        { x: width - 1 - strokeWidthOffset, y: 1 + offset + strokeWidthOffset },
        { x: width - 1 - strokeWidthOffset, y: height - 1 - offset - strokeWidthOffset },
        { x: width - 1 - offset - strokeWidthOffset, y: height - 1 - strokeWidthOffset },
        { x: 1 + offset + strokeWidthOffset, y: height - 1 - strokeWidthOffset },
        { x: 1 + strokeWidthOffset, y: height - 1 - offset - strokeWidthOffset },
        { x: 1 + strokeWidthOffset, y: 1 + offset + strokeWidthOffset },
      ];

      return points.map((p) => `${p.x},${p.y}`).join(" ");
    },

    // --------------
    // innerPolygon
    // --------------
    innerPolygonPoints(state) {
      // Grundlegender Offset für Ecken, basierend auf bluntnessFactor und cornerSize
      const baseOffset = state.bluntnessFactor * 15;

      // Dynamischer Abstand basierend auf spacingFactor für zusätzliche Anpassungen
      const spacing = state.spacingFactor * 5;
      const width = state.widthFactor;
      const height = state.heightFactor;

      // Dynamische Anpassung der Ecken basierend auf cornerSize und spacingFactor
      const adjustedCornerSize = state.cornerSize / (1 + state.spacingFactor * 0.5);

      // Endgültiger Offset unter Berücksichtigung der Eckenanpassung
      const offset = baseOffset * adjustedCornerSize;

      // Berücksichtigt den Einfluss der Strichbreite
      const strokeWidthOffset = (state.strokeWidthFactor - 1) * 1.5;

      const points = [
        { x: 5 + spacing + offset + strokeWidthOffset, y: 5 + spacing + strokeWidthOffset },
        { x: width - 5 - spacing - offset - strokeWidthOffset, y: 5 + spacing + strokeWidthOffset },
        { x: width - 5 - spacing - strokeWidthOffset, y: 5 + spacing + offset + strokeWidthOffset },
        { x: width - 5 - spacing - strokeWidthOffset, y: height - 5 - spacing - offset - strokeWidthOffset },
        { x: width - 5 - spacing - offset - strokeWidthOffset, y: height - 5 - spacing - strokeWidthOffset },
        { x: 5 + spacing + offset + strokeWidthOffset, y: height - 5 - spacing - strokeWidthOffset },
        { x: 5 + spacing + strokeWidthOffset, y: height - 5 - spacing - offset - strokeWidthOffset },
        { x: 5 + spacing + strokeWidthOffset, y: 5 + spacing + offset + strokeWidthOffset },
      ];

      return points.map((p) => `${p.x},${p.y}`).join(" ");
    },            

    // --------------
    // clipPathPolygon
    // --------------
    clipPathPolygonPoints(state) {
      // Grundlegender Offset basierend auf bluntnessFactor und cornerSize
      const baseOffset = state.bluntnessFactor * 15;

      // Dynamischer Abstand basierend auf spacingFactor für zusätzliche Anpassungen
      const spacing = state.spacingFactor * 5;
      const width = state.widthFactor;
      const height = state.heightFactor;

      // Zusätzlicher Offset basierend auf der Strichbreite (half-stroke für Clip Path)
      const defaultOffset = 0.5 * state.strokeWidthFactor;

      // Dynamische Anpassung der Ecken basierend auf cornerSize und spacingFactor
      const adjustedCornerSize = state.cornerSize / (1 + state.spacingFactor * 0.5);

      // Endgültiger Offset unter Berücksichtigung der Eckenanpassung
      const offset = baseOffset * adjustedCornerSize;

      // Dynamischer Faktor für xOffset zur Steuerung der Asymmetrie des Clip Paths
      const xOffsetFactor = 0.0195 + state.spacingFactor * 0.01;

      // Dynamische Berechnung von xOffset, basierend auf bluntnessFactor, strokeWidth und cornerSize
      const xOffset =
        state.bluntnessFactor === 0
          ? 0 // Kein Versatz, wenn bluntnessFactor 0 ist
          : offset * (xOffsetFactor * state.strokeWidthFactor * (1 / state.bluntnessFactor) * (1 / state.cornerSize));

      // Berücksichtigt den Einfluss der Strichbreite
      const strokeWidthOffset = (state.strokeWidthFactor - 1) * 1.5;

      const innerPoints = [
        {
          x: 5 + spacing + offset - xOffset + strokeWidthOffset + defaultOffset,
          y: 5 + spacing + strokeWidthOffset + defaultOffset,
        },
        {
          x: width - 5 - spacing - offset + xOffset - strokeWidthOffset - defaultOffset,
          y: 5 + spacing + strokeWidthOffset + defaultOffset,
        },
        {
          x: width - 5 - spacing - strokeWidthOffset - defaultOffset,
          y: 5 + spacing + offset - xOffset + strokeWidthOffset + defaultOffset,
        },
        {
          x: width - 5 - spacing - strokeWidthOffset - defaultOffset,
          y: height - 5 - spacing - offset + xOffset - strokeWidthOffset - defaultOffset,
        },
        {
          x: width - 5 - spacing - offset + xOffset - strokeWidthOffset - defaultOffset,
          y: height - 5 - spacing - strokeWidthOffset - defaultOffset,
        },
        {
          x: 5 + spacing + offset - xOffset + strokeWidthOffset + defaultOffset,
          y: height - 5 - spacing - strokeWidthOffset - defaultOffset,
        },
        {
          x: 5 + spacing + strokeWidthOffset + defaultOffset,
          y: height - 5 - spacing - offset + xOffset - strokeWidthOffset - defaultOffset,
        },
        {
          x: 5 + spacing + strokeWidthOffset + defaultOffset,
          y: 5 + spacing + offset - xOffset + strokeWidthOffset + defaultOffset,
        },
      ];

      return innerPoints.map((p) => `${p.x},${p.y}`).join(" ");
    },
  },

  // --------------
  // Actions
  // --------------
  actions: {
    updateFactors(width, height, corner, spacing, strokeWidth) {
      this.widthFactor = width;
      this.heightFactor = height;
      this.bluntnessFactor = corner;
      this.spacingFactor = spacing;
      this.cornerSize = corner;
      this.strokeWidthFactor = strokeWidth;
    },
    createClipPath() {
      this.clipPathCreated = true;
    },
    removeClipPath() {
      this.clipPathCreated = false;
    },
  },
});
