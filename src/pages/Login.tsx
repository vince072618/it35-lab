import { 
  IonAlert,
  IonButton,
  IonContent, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonToast,  
  useIonRouter
} from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClients';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true); 
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
  };
  
  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        {/* Background GIF */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://i.pinimg.com/originals/ee/11/9a/ee119a5f13fbecb496deba48c6b30e48.gif")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
          opacity: 0.6,
        }}></div>

        {/* Login Card Area */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          minHeight: '100vh',
          padding: '20px',
        }}>
          {/* Login Card */}
          <div style={{
            width: '100%',
            maxWidth: '400px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // darker, matching atlas gif
            borderRadius: '20px',
            padding: '40px 30px',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '2px solid black', 
            marginLeft: '40px',
          }}>
            {/* Logo Image */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '30px',
            }}>
              <img 
                src="https://www.pcguide.com/wp-content/uploads/2023/04/atlasos-logo.jpg" 
                alt="AtlasOS Logo"
                style={{ width: '150px', height: 'auto', borderRadius: '10px' }}
              />
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: '22px',
              fontWeight: 600,
              textAlign: 'center',
              marginBottom: '20px',
              color: '#ffffff', // White for better contrast
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
            }}>Welcome Back</h1>

            {/* Inputs */}
            <IonInput
              label="Email"
              labelPlacement="floating"
              fill="outline"
              type="email"
              placeholder="Email address"
              value={email}
              onIonChange={e => setEmail(e.detail.value!)}
              style={{ 
                marginBottom: '20px',
                color: '#ffffff',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                '--highlight-color-focused': 'white',
                '--border-color': 'white',
              }}
            />

            <IonInput
              fill="outline"
              type="password"
              placeholder="Password"
              value={password}
              onIonChange={e => setPassword(e.detail.value!)}
              style={{ 
                marginBottom: '30px',
                color: '#ffffff',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                '--highlight-color-focused': 'white',
                '--border-color': 'white',
              }}
            >
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>

            {/* Button */}
            <IonButton 
              onClick={doLogin} 
              expand="block" 
              shape="round" 
              style={{ 
                marginBottom: '10px', 
                backgroundColor: '#1a73e8',
                color: 'white'
              }}
            >
              Log In
            </IonButton>

            {/* Register link */}
            <div style={{
              textAlign: 'center',
              marginTop: '10px',
              fontSize: '14px',
              color: '#ffffff',
            }}>
              Don't have an account?&nbsp;
              <a href="/it35-lab/register" style={{ color: '#1a73e8', textDecoration: 'underline', fontWeight: 500 }}>
                Register
              </a>
            </div>

          </div>

          {/* AlertBox */}
          <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

          {/* IonToast for success */}
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Login successful! Redirecting..."
            duration={1500}
            position="top"
            color="primary"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
