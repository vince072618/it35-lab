import { 
  IonAvatar,
  IonButton,
  IonContent, 
  IonItem, 
  IonInput, 
  IonInputPasswordToggle, 
  IonPage, 
  IonTitle, 
  useIonRouter
} from '@ionic/react';
import { useState } from 'react';

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false); // State to toggle between login and registration
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigation = useIonRouter();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Here, you should handle saving user registration data (e.g., to localStorage, backend, etc.)
    localStorage.setItem('user', JSON.stringify({ email, password }));
    alert('Registration Successful!');
    setIsRegistering(false); // Switch to login page after successful registration
  };

  const handleLogin = () => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('You must register first!');
      return;
    }

    const user = JSON.parse(storedUser);

    if (email === user.email && password === user.password) {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            marginTop: '-10rem',
            marginBottom: '-18rem',
          }}
        >
          <IonAvatar
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
            <img
              alt="Avatar"
              src="https://t4.ftcdn.net/jpg/03/20/28/53/360_F_320285320_KZUJiOBnPTc1KS3de8d3L90OkrqQBTsL.jpg"
            />
          </IonAvatar>
          <h1
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isRegistering ? 'Create Your Account' : 'Welcome Back'}
          </h1>
        </div>

        {isRegistering ? (
          <>
            <IonTitle>Create Account</IonTitle>
            <IonItem>
              <IonInput
                label="Email"
                type="email"
                placeholder="email@domain.com"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
              <IonInputPasswordToggle slot="end" />
            </IonItem>

            <IonItem>
              <IonInput
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
              />
              <IonInputPasswordToggle slot="end" />
            </IonItem>

            <IonButton onClick={handleRegister} expand="full">
              Register
            </IonButton>
            <IonButton
              onClick={() => setIsRegistering(false)}
              expand="full"
              fill="clear"
            >
              Already have an account? Sign In
            </IonButton>
          </>
        ) : (
          <>
            <IonTitle>Sign In</IonTitle>
            <IonItem>
              <IonInput
                label="Email"
                type="email"
                placeholder="email@domain.com"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>

            <IonButton onClick={handleLogin} expand="full">
              Sign In
            </IonButton>
            <IonButton
              onClick={() => setIsRegistering(true)}
              expand="full"
              fill="clear"
            >
              Don't have an account? Create one
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Login;
