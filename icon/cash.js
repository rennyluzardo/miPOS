import React from 'react';
import './icon.scss';

const Icon = ({ width, height }) => {
  return (
    <svg className="svg-1" width={width} height={height} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 50 50" xmlSpace="preserve">
      <g id="Symbols_22_">
        <g>
          <g id="logo-cash">
            <g id="Mask_1_">
              <circle className="st7" cx="25" cy="25" r="24" />
            </g>
            <defs>
              <filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="7" y="7.8" width="36.1" height="35.3">
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
              </filter>
            </defs>
            {/* <mask maskUnits="userSpaceOnUse" x="7" y="7.8" width="36.1" height="35.3" id="mask-2_1_">
              <g className="st0">
                <circle id="path-1_1_" className="st1" cx="25" cy="25" r="24" />
              </g>
            </mask> */}
            <g className="st9">
              <g transform="translate(1.500000, 2.000000)">
                <g>
                  <ellipse id="Oval" className="st10" cx="23.5" cy="23.5" rx="18" ry="17.7" />
                  <path className="st11" d="M26,21.8h-4.6c-1.4,0-2.3-0.9-2.3-2.2c0-1.3,0.9-2.2,2.3-2.2h6.9c1.4,0,2.3-0.9,2.3-2.2c0-1.3-0.9-2.2-2.3-2.2H26c0-1.3-0.9-2.2-2.3-2.2c-1.4,0-2.3,0.9-2.3,2.2c-3.9,0-6.9,2.9-6.9,6.6s3,6.6,6.9,6.6H26c1.4,0,2.3,0.9,2.3,2.2c0,1.3-0.9,2.2-2.3,2.2h-6.9c-1.4,0-2.3,0.9-2.3,2.2c0,1.3,0.9,2.2,2.3,2.2h2.3c0,1.3,0.9,2.2,2.3,2.2c1.4,0,2.3-0.9,2.3-2.2c3.9,0,6.9-2.9,6.9-6.6S29.9,21.8,26,21.8z" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Icon;