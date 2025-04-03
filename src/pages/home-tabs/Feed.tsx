import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle, 
  IonItem, 
  IonLabel 
} from '@ionic/react';

const Feed: React.FC = () => {
return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot='start'>
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>Feed</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <div className="content-container">
        <h2>Featured Gamers</h2>

        {/* Featured Game Stream 1 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Stream: Fortnite Live</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>
                <h3>Streamer: GamerX</h3>
                <p>Join GamerX as they battle it out in Fortnite live! Watch and interact in real time.</p>
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

        {/* Featured Game Stream 2 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Stream: Valorant Showdown</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>
                <h3>Streamer: ProPlayer99</h3>
                <p>Watch ProPlayer99 dominate in this intense Valorant showdown.</p>
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

        {/* Upcoming Streams Section */}
        <h2>Upcoming Streams</h2>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Upcoming: League of Legends Tournament</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>
                <h3>Streamer: TeamElite</h3>
                <p>Don’t miss the upcoming tournament stream from TeamElite in League of Legends!</p>
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </div>
    </IonContent>
  </IonPage>
);
};

export default Feed;
