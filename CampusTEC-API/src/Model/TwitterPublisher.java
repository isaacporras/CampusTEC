package Model;
import twitter4j.Twitter;
import twitter4j.Status;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

public class TwitterPublisher {
    private static final String CONSUMER_KEY = "Dlbo2wvekv6uwupbm2BJIW4Uj";
    private static final String CONSUMER_SECRET = "OXpqq7bqHxNVpZ3yRhe8Ryc2YgpIuNHUH1BrNJZD5s34N3UFKG";
    private static final String ACCESS_TOKEN = "1283954987790487554-iRUQZaq58WRE61lVFC7YdcUpKnmL3D";
    private static final String ACCESS_TOKEN_SECRET = "fAOqmxy96yTBkoOj4NkpSpcyYHYlcxHnT0oRJXYw8kY71";
    private static Twitter instance;
    private static Object sync;

    private TwitterPublisher(){};

    public static Twitter getTwitterInstance() {
        Twitter result = instance;
        if(result == null) {
            synchronized (sync) {
                disableCertificates();
                ConfigurationBuilder cb = new ConfigurationBuilder();
                cb.setDebugEnabled(true)
                        .setOAuthConsumerKey(CONSUMER_KEY)
                        .setOAuthConsumerSecret(CONSUMER_SECRET)
                        .setOAuthAccessToken(ACCESS_TOKEN)
                        .setOAuthAccessTokenSecret(ACCESS_TOKEN_SECRET);

                TwitterFactory tf = new TwitterFactory(cb.build());
                result = instance;
                if(result == null) {
                    result = tf.getInstance();
                }
            }
        }
        return result;
    }

    public static void updateTweet(Twitter twitter, String tweet) throws TwitterException {
        Status status = twitter.updateStatus(tweet);
        System.out.println("Successfully updated the status to [" + status.getText() + "].");
    }

    private static void disableCertificates() {
        TrustManager[] trustAllCerts = new TrustManager[]{
                new X509TrustManager() {

                    @Override
                    public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                        return null;
                    }

                    @Override
                    public void checkClientTrusted(
                            java.security.cert.X509Certificate[] certs, String authType) {
                    }

                    @Override
                    public void checkServerTrusted(
                            java.security.cert.X509Certificate[] certs, String authType) {
                    }
                }
        };

        // Install the all-trusting trust manager
        try {
            SSLContext sc = SSLContext.getInstance("SSL");
            sc.init(null, trustAllCerts, new java.security.SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
        } catch (Exception e) {
        }
    }
}

