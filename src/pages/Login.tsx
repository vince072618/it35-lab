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
                    <img alt="Silhouette of a person's head" src="https://scontent.fcgm1-1.fna.fbcdn.net/v/t39.30808-6/477202768_2436664660023090_114906604535478103_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFHYwAmJpk8_jqmlhHqQ-_SNMRThABa3H00xFOEAFrcfYYyZBe7R3yE4Sg7XF9JDRfQ0tDcE4YN4rb9tfkY-Zxa&_nc_ohc=cQT5fKht27kQ7kNvgF-JMIa&_nc_oc=AdhfdA3q7POlJvnUZkrpj7hvBit58h6wpDAFdVq9kwpCrDoUjKnTDqop3cFSPc7M17g&_nc_zt=23&_nc_ht=scontent.fcgm1-1.fna&_nc_gid=AVpkw4joVck5HNS6fjXVAt9&oh=00_AYDCdxTz9kOVJ6RVyLxhO15Uq6ArKQGfJnJEnr7LLUxCEA&oe=67CB3E75" />
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