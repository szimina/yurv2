
import { Parallax } from 'react-scroll-parallax';

const Test = () => {
  return (
      <div style={{ height: '2000px', position: 'relative' }}>
        <Parallax translateY={[-100, 100]} startScroll={0} endScroll={1000}>
          <div
            style={{
              width: '300px',
              height: '300px',
              backgroundColor: 'lightblue',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '24px',
              color: 'white',
            }}
          >
            Parallax Effect
          </div>
        </Parallax>
      </div>
  );
};

export default Test;