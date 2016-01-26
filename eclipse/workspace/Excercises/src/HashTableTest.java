import java.util.*;
public class HashTableTest {
	public static void main (String[] args) {
		Hashtable table = new Hashtable<String, String>();
		
		table.put("aaa", "vvv");
		table.put("bbb", "ccc");
		table.put("ccc", "rrr");
		
		String str = null;
		Enumeration keys = table.keys();
		while (keys.hasMoreElements()) {
			str = (String) keys.nextElement();
			System.out.println(str + " : " + table.get(str));
		}
	}
}
