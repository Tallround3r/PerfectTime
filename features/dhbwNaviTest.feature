# language: de

Funktionalität: Test der Navigations-Leiste
  Als ein Nutzer der DHBW-Seite
  möchte ich die Navigationsleiste nutzen
  um besser zu navigieren

  Grundlage:
    Angenommen ich befinde mich auf der "Startseite"

  @only
  Szenario: Die Leiste klappt mit der Menü-Schaltfläche auf
    Wenn ich mit dem Mauszeiger auf "Menü" klicke
    Dann wird "die Navigationsleiste" angezeigt

  Szenario: Die Leiste schließt sich mit der Schließen-Schaltfläche
    Wenn ich mit dem Mauszeiger auf "Menü" klicke
    Und ich mit dem Mauszeiger auf "Schließen" klicke
    Dann wird "die Navigationsleiste" nicht angezeigt

  Szenariogrundriss: Es gibt Suchergebnisse für ein Suchwort
    Wenn ich über das Suchfeld nach <suchwort> suche
    Dann werden die Suchergebnisse aufgelistet
    Und es wird <ergebnis> Suchergebnis aufgeführt

    Beispiele:
      | suchwort      | ergebnis         |
      | "Informatik"  | "mindestens ein" |
      | "qwertzuiopü" | "kein"           |
