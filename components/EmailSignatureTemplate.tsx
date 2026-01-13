
import React from 'react';
import { SignatureData } from '../types';

interface Props {
  data: SignatureData;
}

export const EmailSignatureTemplate: React.FC<Props> = ({ data }) => {
  const brandBlue = '#2563EB'; // Vibrant Electric Blue
  const brandDark = '#000000'; // Pure Black for high contrast
  const brandGray = '#6B7280';
  const brandLightGray = '#F3F4F6';

  // High-quality monochrome icons for aesthetic consistency
  const icons = {
    linkedin: "https://cdn-icons-png.flaticon.com/512/61/61109.png",
    twitter: "https://cdn-icons-png.flaticon.com/512/5969/5969020.png", // X logo
    instagram: "https://cdn-icons-png.flaticon.com/512/1384/1384031.png"
  };

  const SocialIconButton = ({ url, icon }: { url: string; icon: string }) => (
    <td style={{ paddingRight: '12px' }}>
      <a href={url} target="_blank" rel="noreferrer" style={{ display: 'block' }}>
        <img src={icon} alt="Social" width="16" height="16" style={{ display: 'block' }} />
      </a>
    </td>
  );

  return (
    <table cellPadding="0" cellSpacing="0" border={0} style={{ 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", 
      color: brandDark, 
      lineHeight: '1.4',
      minWidth: '500px'
    }}>
      <tr>
        <td style={{ padding: '0px' }}>
          <table cellPadding="0" cellSpacing="0" border={0}>
            <tr>
              {/* BRAND ICON BLOCK (The ^A Key Motif) */}
              <td style={{ verticalAlign: 'top', paddingRight: '32px' }}>
                <table cellPadding="0" cellSpacing="0" border={0} style={{ 
                  backgroundColor: '#FFFFFF', 
                  border: `1px solid ${brandLightGray}`, 
                  borderRadius: '16px',
                  boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.08)'
                }}>
                  <tr>
                    <td style={{ padding: '18px', textAlign: 'center' }}>
                       <img 
                        src={data.logoUrl || "https://i.ibb.co/LdpS7M4/control-logo.png"} 
                        alt="^A" 
                        width="70" 
                        style={{ display: 'block' }}
                      />
                    </td>
                  </tr>
                </table>
              </td>

              {/* INFORMATION CONTENT */}
              <td style={{ verticalAlign: 'top' }}>
                <table cellPadding="0" cellSpacing="0" border={0}>
                  <tr>
                    <td style={{ paddingBottom: '2px' }}>
                      <span style={{ 
                        fontSize: '26px', 
                        fontWeight: 900, 
                        color: brandDark, 
                        letterSpacing: '-0.04em',
                        display: 'block',
                        lineHeight: '1'
                      }}>
                        {data.fullName}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: '16px' }}>
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: 800, 
                        color: brandBlue, 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.2em' 
                      }}>
                        {data.jobTitle}
                      </span>
                    </td>
                  </tr>
                  
                  {/* CONTACT & CTA ROW */}
                  <tr>
                    <td>
                      <table cellPadding="0" cellSpacing="0" border={0}>
                        <tr>
                          {/* Connect Button (High Conversion) */}
                          <td style={{ paddingRight: '20px' }}>
                            <a href={data.connectUrl} target="_blank" rel="noreferrer" style={{ 
                              backgroundColor: brandBlue,
                              color: '#FFFFFF',
                              textDecoration: 'none',
                              fontSize: '10px',
                              fontWeight: 800,
                              padding: '10px 18px',
                              borderRadius: '100px',
                              display: 'inline-block',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}>
                              Connect with us &rarr;
                            </a>
                          </td>

                          {/* Social Media Logos */}
                          <SocialIconButton url={data.linkedin} icon={icons.linkedin} />
                          <SocialIconButton url={data.twitter} icon={icons.twitter} />
                          <SocialIconButton url={data.instagram} icon={icons.instagram} />
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      {/* FOOTER STRIP */}
      <tr>
        <td style={{ paddingTop: '28px' }}>
          <table cellPadding="0" cellSpacing="0" border={0} width="100%">
            <tr>
              <td style={{ height: '1px', backgroundColor: brandLightGray }} colSpan={2}></td>
            </tr>
            <tr>
              <td style={{ paddingTop: '16px', fontSize: '10px', fontWeight: 800, color: brandGray, textTransform: 'uppercase', letterSpacing: '0.25em' }}>
                {data.tagline}
              </td>
              <td style={{ paddingTop: '16px', textAlign: 'right', fontSize: '11px', fontWeight: 700, color: brandBlue }}>
                <a href={`https://${data.website}`} style={{ color: brandBlue, textDecoration: 'none' }}>{data.website}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  );
};
