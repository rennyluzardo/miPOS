import React from 'react';
import './icon.scss';

const Icon = ({ width, height }) => {
  return (
    <svg width={width} height={height} fill="#DF872B" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 50 50" xmlSpace="preserve">

      <g id="Symbols_34_">
        <g transform="translate(1.000000, 1.000000)">
          <g id="Logo-didi">
            <g id="Mask_7_">
              <g>
                <circle className="st1" cx="24" cy="24" r="23.5" />
                <path className="st12" d="M24,48C10.8,48,0,37.2,0,24S10.8,0,24,0s24,10.8,24,24S37.2,48,24,48z M24,0.9C11.3,0.9,0.9,11.3,0.9,24S11.3,47.1,24,47.1S47.1,36.7,47.1,24S36.7,0.9,24,0.9z" />
              </g>
            </g>
            <defs>
              <filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="7.1" y="12.7" width="34.2" height="28.2">
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
              </filter>
            </defs>
            <mask maskUnits="userSpaceOnUse" x="7.1" y="12.7" width="34.2" height="28.2" id="mask-2_9_">
              <g className="st0">
                <circle id="path-1_9_" className="st1" cx="24" cy="24" r="23.5" />
              </g>
            </mask>
            <g id="didi-logo" className="st39">
              <g id="Fill-7" transform="translate(7.000000, 13.000000)">
                <path className="st40" d="M17.3,21.7c5.9-0.2,10.5-4.9,10.6-10.8V5.9h6.5v5.6c-0.1,9.1-7.9,16.3-17,16.5C8,27.9,0.2,20.6,0.1,11.5v-10c0-1,0.7-1.7,1.6-1.7h26.1v6.1H7.4c-0.5,0-0.8,0.3-0.8,0.9v4.1C6.6,16.8,11.3,21.7,17.3,21.7" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>

  );
};

export default Icon;