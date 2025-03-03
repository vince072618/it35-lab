import { 
  IonAvatar,
    IonButton,
    IonButtons,
      IonContent, 
      IonHeader, 
      IonIcon, 
      IonInput, 
      IonInputPasswordToggle, 
      IonItem, 
      IonMenuButton, 
      IonPage, 
      IonTitle, 
      IonToolbar, 
      useIonRouter
  } from '@ionic/react';
import { logoFacebook, logoIonic } from 'ionicons/icons';
  
  const Login: React.FC = () => {
    const navigation = useIonRouter();
  
    const doLogin = () => {
        navigation.push('/it35-lab/app','forward','replace');
    }
    return (
      <IonPage>
        <IonContent className='ion-padding'>

        <div style={{
                  display: 'flex',
                  flexDirection:'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  width:'100%',
                  marginTop:'-10rem',
                  marginBottom:'-18rem',
                }}>
             <IonAvatar
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%', 
                      overflow: 'hidden' 
                    }}
                  >
                    <img alt="Silhouette of a person's head" src="https://scontent.fcgm1-1.fna.fbcdn.net/v/t39.30808-6/471332119_2400823340273889_1470886665211198857_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEmihZhXyuddQcEdaPshy_1bq-k74azHtZur6TvhrMe1sXIgC2WhBA0kF5n31H3ydBhdiewkD2I9SWVDu-1KMws&_nc_ohc=XtIWOSK954sQ7kNvgEPCJqF&_nc_oc=AdiyfyZRdIEHFQ82y4oNW78RrOk4EbaxlWNIpTRTpEdKMwc5rDSIalzGK2d7zejMz2I&_nc_zt=23&_nc_ht=scontent.fcgm1-1.fna&_nc_gid=At9MWxDYMZOynycVMYczcyg&oh=00_AYDGYALN0Uzn6jdPg9wKiqkTl6s-D00U4mR61rCtlN5Crg&oe=67CB2B22" />
                    {/*
                     <IonIcon 
                      icon={logoFacebook}
                      color='primary'
                      style={{ fontSize: '120px', color: '#6c757d' }} 
                    />
                    */}
                  </IonAvatar>
                  <h1 style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>USER LOGIN</h1>
                    
          </div>
          
            <IonTitle>Login</IonTitle>
          <IonItem>
        <IonInput label="Email input" type="email" placeholder="email@domain.com"></IonInput>
      </IonItem>

        <IonInput type="password" label="Password" value="NeverGonnaGiveYouUp">
      <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
    </IonInput>
            <IonButton onClick={() => doLogin()} expand="full">
                Login
            </IonButton>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;