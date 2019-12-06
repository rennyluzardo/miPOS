import React from 'react';
import './icon.scss';

const Icon = ({ width, height }) => {
  return (
    <svg className="svg-1" width={width} height={height} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 50 50" xmlSpace="preserve">

      <g id="Symbols_23_">
        <g transform="translate(1.000000, 1.000000)">
          <g id="Logo-MC">
            <g id="Mask_2_">
              <g>
                <circle className="st1" cx="24" cy="24" r="23.5" />
                <path className="st12" d="M24,48C10.8,48,0,37.2,0,24S10.8,0,24,0s24,10.8,24,24S37.2,48,24,48z M24,1C11.3,1,1,11.3,1,24s10.3,23,23,23s23-10.3,23-23S36.7,1,24,1z" />
              </g>
            </g>
            <defs>
              <filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="9.9" y="14.6" width="29" height="17.6">
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
              </filter>
            </defs>
            {/* <mask maskUnits="userSpaceOnUse" x="9.9" y="14.6" width="29" height="17.6" id="mask-2_3_">
              <g className="st0">
                <circle id="path-1_3_" className="st1" cx="24" cy="24" r="23.5" />
              </g>
            </mask> */}
            <g className="st14">
              <g transform="translate(10.000000, 15.000000)">
                <g>
                  <g id="_Group_">
                    <rect id="Rectangle_1_" x="10.5" y="1.5" className="st15" width="7.9" height="13.9" />
                    <path id="_Path_" className="st16" d="M11,8.4c0-2.7,1.3-5.3,3.4-6.9c-3.7-2.8-9-2.4-12.1,1s-3.2,8.6,0,12s8.5,3.8,12.1,1C12.3,13.7,11,11.2,11,8.4L11,8.4z" />
                    <path id="Path_3_" className="st17" d="M29,8.4c0,3.4-2,6.5-5.1,7.9c-3.1,1.5-6.8,1.1-9.5-1c2.2-1.7,3.4-4.2,3.4-6.9s-1.3-5.3-3.4-6.9c2.7-2.1,6.4-2.5,9.5-1S29,5.1,29,8.4L29,8.4z" />
                  </g>
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