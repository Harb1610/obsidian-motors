import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';
export const alt = 'Escudo Obsidian Motors';

// Favicon recortado: conserva el fondo negro del escudo aprobado.
export default async function Icon() {
  const image = await readFile(join(process.cwd(), 'public/photo-4b5cf475.jpg'));
  return new ImageResponse(
    <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#000' }}>
      <img alt="" src={`data:image/jpeg;base64,${image.toString('base64')}`} width={91} height={91} style={{ position: 'absolute', left: -13, top: -5 }} />
    </div>, size,
  );
}
