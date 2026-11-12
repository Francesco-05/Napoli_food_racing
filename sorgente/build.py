import json,re,sys,base64,os
# Uso: python3 sorgente/build.py  -> rigenera sito/index.html da sorgente/template.html
HERE=os.path.dirname(os.path.abspath(__file__));SITO=os.path.join(HERE,'..','sito')
P=json.load(open(os.path.join(HERE,'parts.json')));T=open(os.path.join(HERE,'template.html')).read()
cnt=[0]
def uniq(svg):
    cnt[0]+=1;sfx=f'_{cnt[0]}'
    ids=set(re.findall(r'id="([^"]+)"',svg))
    for i in ids:
        svg=svg.replace(f'id="{i}"',f'id="{i}{sfx}"').replace(f'url(#{i})',f'url(#{i}{sfx})').replace(f'href="#{i}"',f'href="#{i}{sfx}"')
    return svg
def clean(svg,cls=None,aria=True):
    svg=svg.replace('\n',' ')
    svg=re.sub(r'\s+',' ',svg)
    a=' aria-hidden="true" focusable="false"' if aria else ''
    c=f' class="{cls}"' if cls else ''
    svg=svg.replace('<svg ',f'<svg{c}{a} ',1)
    return uniq(svg)
def rep(m):
    name=m.group(1);cls=m.group(2)
    if name=='ballh1': return clean(P['ball'],'ball')
    if name=='ballsm': return clean(P['ball'],'ball')
    if name in ('mapPista','mapBox'):
        s=P['evmap' if name=='mapPista' else 'zoommap']
        cls,par=('m-ev','xMidYMid slice') if name=='mapPista' else ('m-zmap','xMidYMin slice')
        s=re.sub(r'<svg width="\d+" height="\d+"',f'<svg class="{cls}" aria-hidden="true" focusable="false" preserveAspectRatio="{par}"',s,count=1)
        if name=='mapPista':
            # mare sotto e terra sopra oltre i bordi del disegno, per qualsiasi proporzione dello schermo
            s=re.sub(r'(<svg[^>]*>)',r'\1<rect x="-4000" y="785" width="9000" height="4000" fill="#CFDDD8"/><rect x="-4000" y="-3982" width="9000" height="4000" fill="#EFE8DA"/>',s,count=1)
        else:
            s=re.sub(r'(<clipPath id="zmclip"><rect[^>]*?) rx="[^"]+"',r'\1',s,count=1)
        return uniq(re.sub(r'\s+',' ',s))
    if name in ('evmapG','zoommapG'):
        s=P[name[:-1]]
        s=re.sub(r'<svg width="\d+" height="\d+"','<svg class="'+('g-ev' if name=='evmapG' else 'g-zm')+'" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice"',s,count=1)
        if name=='evmapG':
            s=re.sub(r'(<svg[^>]*>)',r'\1<rect x="-4000" y="785" width="9000" height="4000" fill="#CFDDD8"/><rect x="-4000" y="-3982" width="9000" height="4000" fill="#EFE8DA"/>',s,count=1)
        return uniq(re.sub(r'\s+',' ',s))
    s=P[name]
    if name in('evmap','zoommap'):
        s=re.sub(r'<svg width="\d+" height="\d+"','<svg role="img" aria-label="'+('Mappa dell\'area food dentro il Tennis Club Napoli' if name=='zoommap' else 'Mappa del circuito del Napoli Racing Show sul lungomare')+'" preserveAspectRatio="xMidYMid meet"',s,1)
        s=s.replace('<svg ','<svg ',1)
        return uniq(re.sub(r'\s+',' ',s))
    return clean(s,cls)
T=re.sub(r'<!--SVG:(\w+)(?::(\w+))?-->',rep,T)
# tessere
TS=[('Poppella','t-terra','poppella_panna','Pasticceria','Il fiocco di neve'),
    ('Say Slice','t-verde','sayslice_panna','Pizza al trancio','Il trancio, ovvio'),
    ('Abbondanza del Pane','t-carta','abbondante_tondo_verde','Panificio','Il pane, ovvio'),
    ('Perrella','t-notte','perrella_panna','Beverage','Birra, acqua e bibite')]
from PIL import Image
h=''
for n,c,lg,ru,ar in TS:
    w,hh=Image.open(os.path.join(SITO,'assets','img',lg+'.webp')).size
    h+=f'''<li class="tessera {c}"><div class="fin"><div class="mini-tenda" aria-hidden="true"></div><img src="assets/img/{lg}.webp" alt="{n}" width="{w}" height="{hh}"></div>
<h3 class="F nome">{n}</h3><p class="corr" lang="nap">Corr' cu nuje!<small lang="it"><img class="mo" src="assets/img/more_oro.webp" alt="Morè" width="700" height="282"> l'ha scelto per la sua squadra.</small></p>
<dl class="campi"><div><dt>Ruolo</dt><dd>{ru}</dd></div><div><dt>Arma segreta</dt><dd>{ar}</dd></div></dl><span class="timbro" aria-hidden="true">{clean(P["stamp"])}</span></li>
'''
T=T.replace('<!--TESSERE-->',h)
SW=P['sw']
lg=''.join(f'<span>{clean(SW[k])}{t}</span>' for k,t in [('trk','Tracciato'),('food','Area food Napoli Food Racing'),('hosp','Area hospitality'),('ponti','Ponti sponsor'),('trib','Tribuna'),('maxi','Maxi schermo')])
T=T.replace('<!--LEGENDA-->',lg)
open(os.path.join(SITO,'index.html'),'w').write(T)
print(len(T))
