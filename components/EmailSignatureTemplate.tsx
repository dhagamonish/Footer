
import React from 'react';
import { SignatureData } from '../types';

interface Props {
  data: SignatureData;
}

export const EmailSignatureTemplate: React.FC<Props> = ({ data }) => {
  const brandBlue = '#0061FF'; 
  const brandDark = '#000000'; 
  const brandGray = '#94a3b8';
  const handle = '/bycontrolplusa';

  const icons = {
    linkedin: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
    twitter: "https://cdn-icons-png.flaticon.com/512/5969/5969020.png", // X Logo
    instagram: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
  };

  const VerticalSocialItem = ({ url, icon, label }: { url: string; icon: string; label: string }) => (
    <tr>
      <td style={{ paddingBottom: '8px' }}>
        <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ verticalAlign: 'middle', paddingRight: '8px' }}>
              <a href={url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <img src={icon} alt="" width="14" height="14" style={{ display: 'block', border: '0', opacity: 0.7 }} />
              </a>
            </td>
            <td style={{ verticalAlign: 'middle' }}>
              <span style={{ 
                fontSize: '11px', 
                color: brandGray, 
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                whiteSpace: 'nowrap'
              }}>{label}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  );

  return (
    <table cellPadding="0" cellSpacing="0" border={0} style={{ 
      fontFamily: "'Montserrat', sans-serif", 
      backgroundColor: '#FFFFFF',
      padding: '0px',
      minWidth: '600px',
      lineHeight: '1.4',
      borderCollapse: 'collapse'
    }}>
      <tr>
        {/* LOGO COLUMN */}
        <td style={{ verticalAlign: 'middle', paddingRight: '24px' }}>
          <img 
            src={data.logoUrl} 
            alt="Logo" 
            width="55"
            style={{ display: 'block', border: '0' }}
          />
        </td>

        {/* VERTICAL DIVIDER - Hardened for Titan/Outlook/Gmail */}
        <td width="2" style={{ 
          width: '2px', 
          minWidth: '2px', 
          maxWidth: '2px', 
          backgroundColor: brandBlue, 
          padding: '0px', 
          margin: '0px',
          fontSize: '0px', 
          lineHeight: '0px',
          border: 'none'
        }}>
          {/* Using a nested table with a height constraint to force the line to render cleanly */}
          <table border={0} cellPadding="0" cellSpacing="0" style={{ width: '2px', minWidth: '2px', maxWidth: '2px', borderCollapse: 'collapse' }}>
            <tr>
              <td height="120" style={{ width: '2px', minWidth: '2px', maxWidth: '2px', fontSize: '1px', lineHeight: '1px', backgroundColor: brandBlue }}>
                &nbsp;
              </td>
            </tr>
          </table>
        </td>

        {/* MAIN CONTENT COLUMN */}
        <td style={{ paddingLeft: '24px', verticalAlign: 'top', paddingRight: '32px' }}>
          <table cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ borderCollapse: 'collapse' }}>
            {/* BRAND HEADER */}
            <tr>
              <td>
                <span style={{ 
                  fontSize: '32px', 
                  fontWeight: 700, 
                  color: brandDark, 
                  letterSpacing: '-0.04em',
                  fontFamily: "'Montserrat', sans-serif",
                  lineHeight: '1.1'
                }}>
                  control <span style={{ color: brandBlue }}>+</span> a
                </span>
              </td>
            </tr>

            {/* TAGLINE */}
            <tr>
              <td style={{ paddingTop: '2px', paddingBottom: '16px' }}>
                <span style={{ 
                  fontSize: '15px', 
                  color: brandGray, 
                  fontWeight: 400,
                  fontFamily: "'Montserrat', sans-serif"
                }}>
                  {data.tagline}
                </span>
              </td>
            </tr>

            {/* CONTACT INFO - Website Highlighted Blue */}
            <tr>
              <td style={{ paddingBottom: '20px' }}>
                <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
                  <tr>
                    <td style={{ verticalAlign: 'middle' }}>
                      <a href={`https://${data.website}`} style={{ color: brandBlue, textDecoration: 'none', fontSize: '12px', fontWeight: 600 }}>{data.website}</a>
                    </td>
                    <td style={{ paddingLeft: '10px', paddingRight: '10px', color: brandGray, fontSize: '12px', verticalAlign: 'middle' }}>|</td>
                    <td style={{ verticalAlign: 'middle' }}>
                      <a href={`mailto:${data.email}`} style={{ color: brandGray, textDecoration: 'none', fontSize: '12px', fontWeight: 500 }}>{data.email}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            {/* CTA BUTTON */}
            <tr>
              <td>
                <a href={data.connectUrl} target="_blank" rel="noreferrer" style={{ 
                  backgroundColor: brandBlue,
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  padding: '12px 32px',
                  borderRadius: '30px',
                  display: 'inline-block',
                  textAlign: 'center',
                  fontFamily: "'Montserrat', sans-serif"
                }}>
                  Connect with us
                </a>
              </td>
            </tr>
          </table>
        </td>

        {/* VERTICAL SOCIAL COLUMN (RIGHT) */}
        <td style={{ paddingLeft: '24px', verticalAlign: 'middle' }}>
          <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
            <VerticalSocialItem url={data.linkedin} icon={icons.linkedin} label={handle} />
            <VerticalSocialItem url={data.instagram} icon={icons.instagram} label={handle} />
            <VerticalSocialItem url={data.twitter} icon={icons.twitter} label={handle} />
          </table>
        </td>
      </tr>
    </table>
  );
};
