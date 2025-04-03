import React, { useState } from 'react';
import {
    IonButton,
    IonContent,
    IonInput,
    IonInputPasswordToggle,
    IonPage,
    IonModal,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonAlert,
    IonRow,
    IonCol,
} from '@ionic/react';
import { supabase } from '../utils/supabaseClients';
import bcrypt from 'bcryptjs';

// Reusable Alert Component
const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => (
    <IonAlert isOpen={isOpen} onDidDismiss={onClose} header="Notification" message={message} buttons={['OK']} />
);

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [modals, setModals] = useState({
        verification: false,
        success: false,
    });

    const [alert, setAlert] = useState({ message: '', show: false });

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleOpenVerificationModal = () => {
        const { email, password, confirmPassword } = formData;

        if (!email.endsWith('@nbsc.edu.ph')) {
            setAlert({ message: 'Only @nbsc.edu.ph emails are allowed.', show: true });
            return;
        }

        if (password !== confirmPassword) {
            setAlert({ message: 'Passwords do not match.', show: true });
            return;
        }

        setModals((prev) => ({ ...prev, verification: true }));
    };

    const doRegister = async () => {
        setModals((prev) => ({ ...prev, verification: false }));

        try {
            const { email, password, firstName, lastName } = formData;

            // Sign up with Supabase authentication
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) throw new Error(error.message);

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user data
            const { error: insertError } = await supabase.from('users').insert([
                { user_email: email, user_firstname: firstName, user_lastname: lastName, user_password: hashedPassword },
            ]);

            if (insertError) throw new Error(insertError.message);

            setModals((prev) => ({ ...prev, success: true }));
        } catch (err) {
            setAlert({ message: err instanceof Error ? err.message : 'An unknown error occurred.', show: true });
        }
    };

    return (
        <IonPage>
            <IonContent className="ion-padding" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <IonCard style={{ width: '100%', maxWidth: '400px', padding: '20px', textAlign: 'center', borderRadius: '12px' }}>
                    <IonCardHeader>
                        <IonCardTitle style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '5px' }}>Sign Up</IonCardTitle>
                        <IonText color="medium" style={{ fontSize: '16px', display: 'block', marginBottom: '10px' }}>
                            It’s quick and easy.
                        </IonText>
                    </IonCardHeader>

                    <IonRow>
                        <IonCol>
                            <IonInput
                                label="First Name"
                                labelPlacement="stacked"
                                fill="outline"
                                style={{ fontSize: '16px' }}
                                value={formData.firstName}
                                onIonChange={(e) => handleChange('firstName', e.detail.value!)}
                            />
                        </IonCol>
                        <IonCol>
                            <IonInput
                                label="Last Name"
                                labelPlacement="stacked"
                                fill="outline"
                                style={{ fontSize: '16px' }}
                                value={formData.lastName}
                                onIonChange={(e) => handleChange('lastName', e.detail.value!)}
                            />
                        </IonCol>
                    </IonRow>

                    <IonInput
                        label="Email Address"
                        labelPlacement="stacked"
                        fill="outline"
                        type="email"
                        style={{ fontSize: '16px' }}
                        value={formData.email}
                        onIonChange={(e) => handleChange('email', e.detail.value!)}
                    />
                    
                    <IonInput
                        label="Password"
                        labelPlacement="stacked"
                        fill="outline"
                        type="password"
                        style={{ fontSize: '16px' }}
                        value={formData.password}
                        onIonChange={(e) => handleChange('password', e.detail.value!)}
                    >
                        <IonInputPasswordToggle slot="end" />
                    </IonInput>

                    <IonInput
                        label="Confirm Password"
                        labelPlacement="stacked"
                        fill="outline"
                        type="password"
                        style={{ fontSize: '16px' }}
                        value={formData.confirmPassword}
                        onIonChange={(e) => handleChange('confirmPassword', e.detail.value!)}
                    >
                        <IonInputPasswordToggle slot="end" />
                    </IonInput>

                    <IonButton expand="full" shape="round" color="primary" style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '10px' }} onClick={handleOpenVerificationModal}>
                        Sign Up
                    </IonButton>

                    <IonText style={{ fontSize: '14px', marginTop: '15px' }}>
                        Already have an account?{' '}
                        <IonButton routerLink="/it35-lab" fill="clear" size="small" color="primary">
                            Log in
                        </IonButton>
                    </IonText>
                </IonCard>

                {/* AlertBox Component */}
                <AlertBox message={alert.message} isOpen={alert.show} onClose={() => setAlert({ message: '', show: false })} />
            </IonContent>
        </IonPage>
    );
};

export default Register;
