import useSocketData from '../stores/socketDataStore';

function InformationComponent() {
  const { socketData } = useSocketData();
  return (
    <div >
       <div className="header" style={{backgroundColor:'rgb(219, 218, 218)'}}>
            <img
              className="logo"
              src="/LOGO_PELLENC_2.png"
              alt="logo"
            />
            <div className="header-text" style={{fontSize: '24px', marginLeft: "20px", marginTop: "6px"}}>
              BIENVENUE
            </div>
          </div>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center' }}>
            <div className="info-value-date">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div className="info-value-date">{new Date().toLocaleDateString()}</div>
            <div className="info-value-date">{socketData.data[0].value}°C</div>
          </div>
  </div>

  )
}

export default InformationComponent
