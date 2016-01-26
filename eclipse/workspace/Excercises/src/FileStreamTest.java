import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.InputStream;
import java.io.InputStreamReader;


public class FileStreamTest {
	public static void main (String[] args) {
		try {
			OutputStream os = new FileOutputStream("./test.txt");
			OutputStreamWriter osw = new OutputStreamWriter(os, "utf-8");
			osw.append("中文");
			osw.append("测试");
			osw.append("\r\n");
			osw.close();
			os.close();
			
			InputStream is = new FileInputStream("./test.txt");
			InputStreamReader isr = new InputStreamReader(is, "utf-8");
			
			StringBuilder sb = new StringBuilder();
			while (isr.ready()) {
				sb.append((char)isr.read());
			}
			isr.close();
			is.close();
			
			System.out.println(sb);
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
