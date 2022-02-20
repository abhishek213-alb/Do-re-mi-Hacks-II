import com.twilio.Twilio; 
import com.twilio.converter.Promoter; 
import com.twilio.rest.api.v2010.account.Message; 
import com.twilio.type.PhoneNumber; 
 
import java.net.URI; 
import java.math.BigDecimal; 
 
public class Example { 
    public static final String ACCOUNT_SID = "Enter SID"; 
    public static final String AUTH_TOKEN = "[Enter Token]"; 
 
    public static void main(String[] args) { 
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN); 
        Message message = Message.creator( 
                new com.twilio.type.PhoneNumber("whatsapp: (number)"), 
                new com.twilio.type.PhoneNumber("whatsapp:Number2"),  
                "  Welcome to MusicallyWin.us Coffee? or better, start your day with some musical aptitude to get your brain working!")      
            .create(); 
 
        System.out.println(message.getSid()); 
    } 
}
