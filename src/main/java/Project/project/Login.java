package Project.project;

import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.security.MessageDigest;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPasswordField;
import javax.swing.JTextField;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Hello world!
 *
 */
public class Login extends JFrame {
	private final JLabel lblName;
	private final JTextField tfName;
	private final JLabel lblTime;
	private final JTextField tfTime;
	public Login() {
		// Create Form Frame
		super("Login Form");
		setSize(450, 300);
		setLocation(500, 280);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		getContentPane().setLayout(null);

		// Label Result
		lblName = new JLabel("Name : ");
		tfName = new JTextField();
		tfName.setEnabled(false);
		lblTime = new JLabel("Time : ");
		tfTime = new JTextField();
		tfTime.setEnabled(false);
		lblName.setBounds(26, 54, 370, 14);
		tfName.setBounds(80, 54, 200, 18);
		lblTime.setBounds(26, 80, 370, 14);
		tfTime.setBounds(80, 80, 200, 18);
		getContentPane().add(lblName);
		getContentPane().add(lblTime);
		getContentPane().add(tfName);
		getContentPane().add(tfTime);

	}
	
	public void setName(String name){
		tfName.setText(name);
	}
	
	public void setDate(String date){
		tfTime.setText(date);
	}
	


}
