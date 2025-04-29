import React, { useState } from 'react';
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
import { supabase } from '../utils/supabaseClients';
import bcrypt from 'bcryptjs';

// Reusable AlertBox Component
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

const Register: React.FC = () => {
  const navigation = useIonRouter();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleOpenVerificationModal = () => {
    if (!email.endsWith('@nbsc.edu.ph')) {
      setAlertMessage('Only @nbsc.edu.ph emails are allowed to register.');
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage('Passwords do not match.');
      setShowAlert(true);
      return;
    }

    doRegister();
  };

  const doRegister = async () => {
    try {
      // Sign up in Supabase authentication
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        throw new Error('Account creation failed: ' + error.message);
      }

      // Hash password before storing in the database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert user data into 'users' table
      const { error: insertError } = await supabase.from('users').insert([
        {
          username,
          user_email: email,
          user_firstname: firstName,
          user_lastname: lastName,
          user_password: hashedPassword
        }
      ]);

      if (insertError) {
        throw new Error('Failed to save user data: ' + insertError.message);
      }

      setShowToast(true);
      setTimeout(() => {
        navigation.push('/it35-lab', 'forward', 'replace');
      }, 300);
    } catch (err) {
      if (err instanceof Error) {
        setAlertMessage(err.message);
      } else {
        setAlertMessage('An unknown error occurred.');
      }
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        {/* Background GIF */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage:
              'url("https://i.pinimg.com/originals/ee/11/9a/ee119a5f13fbecb496deba48c6b30e48.gif")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: -1,
            opacity: 0.6
          }}
        ></div>

        {/* Register Card Area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: '100vh',
            padding: '20px'
          }}
        >
          {/* Register Card */}
          <div
            style={{
              width: '100%',
              maxWidth: '400px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)', // darker, matching atlas gif
              borderRadius: '20px',
              padding: '40px 30px',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '2px solid black',
              marginLeft: '40px'
            }}
          >
            {/* Logo Image */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '30px'
              }}
            >
              <img
                src="https://www.pcguide.com/wp-content/uploads/2023/04/atlasos-logo.jpg"
                alt="AtlasOS Logo"
                style={{ width: '150px', height: 'auto', borderRadius: '10px' }}
              />
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: '22px',
                fontWeight: 600,
                textAlign: 'center',
                marginBottom: '20px',
                color: '#ffffff', // White for better contrast
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
              }}
            >
              Create your account
            </h1>

            {/* Inputs */}
            <IonInput
              label="Username"
              labelPlacement="floating"
              fill="outline"
              type="text"
              placeholder="Enter a unique username"
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
              style={{
                marginBottom: '20px',
                color: '#ffffff',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                '--highlight-color-focused': 'white',
                '--border-color': 'white'
              }}
            />

            <IonInput
              label="First Name"
              labelPlacement="floating"
              fill="outline"
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onIonChange={(e) => setFirstName(e.detail.value!)}
              style={{
                marginBottom: '20px',
                color: '#ffffff',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                '--highlight-color-focused': 'white',
                '--border-color': 'white'
              }}
            />

            <IonInput
              label="Last Name"
              labelPlacement="floating"
              fill="outline"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onIonChange={(e) => setLastName(e.detail.value!)}
              style={{
                marginBottom: '20px',
                color: '#ffffff',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                '--highlight-color-focused': 'white',
                '--border-color': 'white'
              }}
            />

            <IonInput
              label="Email"
              labelPlacement="floating"
              fill="outline"
              type="email"
              placeholder="youremail@nbsc.edu.ph"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              style={{
                marginBottom: '20px',
                color: '#ffffff',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                '--highlight-color-focused': 'white',
                '--border-color': 'white'
              }}
            />

            <IonInput
              label="Password"
              labelPlacement="floating"
              fill="outline"
              type="password"
              placeholder="Enter password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              style={{
                marginBottom: '20px',
                color: '#ffffff',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                '--highlight-color-focused': 'white',
                '--border-color': 'white'
              }}
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>

            <IonInput
              label="Confirm Password"
              labelPlacement="floating"
              fill="outline"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onIonChange={(e) => setConfirmPassword(e.detail.value!)}
              style={{
                marginBottom: '30px',
                color: '#ffffff',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                '--highlight-color-focused': 'white',
                '--border-color': 'white'
              }}
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>

            {/* Button */}
            <IonButton
              onClick={handleOpenVerificationModal}
              expand="block"
              shape="round"
              style={{
                marginBottom: '10px',
                backgroundColor: '#1a73e8',
                color: 'white'
              }}
            >
              Register
            </IonButton>

            {/* Login link */}
            <div
              style={{
                textAlign: 'center',
                marginTop: '10px',
                fontSize: '14px',
                color: '#ffffff'
              }}
            >
              Already have an account?&nbsp;
              <a
                href="/it35-lab"
                style={{ color: '#1a73e8', textDecoration: 'underline', fontWeight: 500 }}
              >
                Log In
              </a>
            </div>
          </div>

          {/* AlertBox */}
          <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

          {/* IonToast for success */}
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Registration successful! Redirecting..."
            duration={1500}
            position="top"
            color="primary"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
