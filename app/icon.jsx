import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  const iconPath = path.join(process.cwd(), 'public', 'gallery', 'icon.png');
  let base64Icon = '';
  
  try {
    const iconData = fs.readFileSync(iconPath);
    base64Icon = `data:image/png;base64,${iconData.toString('base64')}`;
  } catch (e) {
    console.error('Failed to read icon.png for favicon:', e);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        {base64Icon ? (
            <img 
              src={base64Icon} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                borderRadius: '50%' 
              }} 
            />
        ) : (
            <div style={{ color: 'black' }}>A</div>
        )}
      </div>
    ),
    { ...size }
  );
}
