package Project.project;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
       try{
    	   HttpClient client = HttpClientBuilder.create().build();
    	   HttpGet request = new HttpGet("http://localhost:3000/api/std");
    	   HttpResponse response = client.execute(request);
    	   BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
    	   StringBuilder sb = new StringBuilder();
    	   String line = null;
    	   while((line=reader.readLine()) != null){
    		   sb.append(line);
    	   }
    	   JSONArray array = new JSONArray(sb.toString());
    	   for(int i=0 ; i<array.length();i++){
    		   JSONObject rfid = array.getJSONObject(i);
    		   if((rfid.getDouble("id")==1)){
    			   System.out.println((rfid.get("name")));
    			   JSONObject json = new JSONObject();
    			   json = array.getJSONObject(i);
    			   System.out.println(json.toString());
    			   try{
    				   HttpPost requestpost= new HttpPost("http://localhost:3000/api/show");
    				   StringEntity params = new StringEntity(json.toString());
    				   requestpost.setHeader("Content-type", "application/json");
    				   requestpost.setEntity(params);
    				   HttpResponse responepost = client.execute(requestpost);
    				   System.out.println("Finish Post");
    			   }catch(Exception e){
    				   e.printStackTrace();
    			   }
    		   }
    	   }
       }catch(Exception e){
    	   e.printStackTrace();
       }
    }
}
