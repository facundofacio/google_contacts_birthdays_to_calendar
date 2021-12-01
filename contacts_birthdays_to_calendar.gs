function contactsBirthdayToCalendar() {
    const myContacts = ContactsApp.getContacts();
    const myCalendar = CalendarApp.getDefaultCalendar();
    
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth()+1;       //month id goes from 0 to 11
  
    for (var i=0; i<myContacts.length; i++) {
      
      var birthday = myContacts[i].getDates(ContactsApp.Field.BIRTHDAY);
      
      if (birthday.length>0) {
  
        var day = birthday[0].getDay().toString();
        var contactMonth = birthday[0].getMonth();
        var month = monthToNumber(contactMonth);
        
        if ((month == currentMonth & day != 1) | 
            (month == currentMonth+1 & day == 1) |
            (month == 1 & currentMonth == 12 & day == 1)) {
  
          var name = myContacts[i].getFullName().toString();
  
          var birthdate = new Date(currentYear, month-1, day);   //needs month id
        
          var event = myCalendar.createAllDayEvent('cumple ' + name,   //set the name of the event
          birthdate,
          new Date(birthdate).setDate(birthdate + 1));
  
          //set the event color in calendar. More options here: https://developers.google.com/apps-script/reference/calendar/event-color.html
          event.setColor("6");         
          event.removeAllReminders();
          
          //set popup and email reminders (minutes before event)
          event.addPopupReminder(480);
          event.addEmailReminder(480);
  
        }
      }
    }
  }
  
  function monthToNumber(m) {
    
    const months = ContactsApp.Month;
    
    const monthToEnum = {
    1: months.JANUARY,
    2: months.FEBRUARY,
    3: months.MARCH,
    4: months.APRIL,
    5: months.MAY,
    6: months.JUNE,
    7: months.JULY,
    8: months.AUGUST,
    9: months.SEPTEMBER,
    10: months.OCTOBER,
    11: months.NOVEMBER,
    12: months.DECEMBER
    };
  
    for (const [key, value] of Object.entries(monthToEnum)) {
      if (value === m) {
        return key;
      }
    }
  }