import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

// Recreate the provided SVG shape using React Native primitives (no SVG).
// Strategy:
// - Render a full-width dark rectangle sized to the original SVG aspect ratio.
// - Place a white rounded rectangle at the top center (inset from both sides)
//   to visually cut out the straight top band (this reproduces the SVG's
//   top-center lower edge with rounded shoulders at the sides).

export default function HeaderShape({ color = '#313131', background = '#ffffff', style }) {
  const { width } = useWindowDimensions();
  // Keep the header at the original SVG height for widths >= 360, but allow
  // it to scale down on smaller screens. This prevents the white overlay from
  // growing taller on very wide screens while still expanding horizontally.
  const baseScale = Math.min(width / 360, 1);
  const height = Math.round(103 * baseScale);
  const topBand = Math.round(24 * baseScale); // white overlay height (fixed for wide screens)
  const inset = 0; // white overlay spans full width
  // Use a corner radius tied to the header height so the rounded ends stay
  // visually consistent and don't grow with screen width.
  const cornerRadius = Math.round(height * 0.5);

  return (
    <View style={[styles.container, { width, height }, style]} accessible accessibilityRole="image" accessibilityLabel="Decorative header background">
      {/* Dark base that matches the SVG fill */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: color }]} />

      {/* White overlay moved to the bottom to vertically flip the white part */}
      <View
        style={[
          styles.cutout,
          {
            left: inset,
            right: inset,
            height: topBand,
            bottom: 0,
            borderBottomLeftRadius: cornerRadius,
            borderBottomRightRadius: cornerRadius,
            backgroundColor: background,
          },
        ]}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  cutout: {
    position: 'absolute',
    top: 0,
  },
});
