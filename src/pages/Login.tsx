import { 
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent, 
  IonIcon, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonToast,  
  useIonRouter
} from '@ionic/react';
import { logoIonic } from 'ionicons/icons';
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
      <IonContent className='ion-padding' style={{ backgroundColor: '#f0f2f5' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '15%',
          width: '100%',
        }}>
          <IonAvatar
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              marginBottom: '20px',
              backgroundColor: '#1877f2',
              color: 'white',
            }}
          >
            <IonIcon 
              icon={logoIonic}
              style={{ fontSize: '60px', color: '#fff' }} 
            />
          </IonAvatar>

          <h2 style={{
            fontSize: '24px',
            color: '#1877f2',
            marginBottom: '20px',
          }}>Login to Your Account</h2>
          
          <IonInput
            label="Email" 
            labelPlacement="floating" 
            fill="outline"
            type="email"
            placeholder="Enter Email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
            style={{ width: '80%', marginBottom: '15px' }}
          />
          <IonInput      
            fill="outline"
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
            style={{ width: '80%', marginBottom: '25px' }}
          >
            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
          </IonInput>

          <IonButton 
            onClick={doLogin} 
            expand="full" 
            shape="round" 
            style={{ backgroundColor: '#1877f2', color: 'white', marginBottom: '10px' }}
          >
            Log In
          </IonButton>

          <IonButton 
            routerLink="/it35-lab/register" 
            expand="full" 
            fill="clear" 
            shape="round" 
            style={{ color: '#1877f2' }}
          >
            Don't have an account? Register here
          </IonButton>

          {/* Reusable AlertBox Component */}
          <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

          {/* IonToast for success message */}
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
