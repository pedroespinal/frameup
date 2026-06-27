import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Image, ActivityIndicator, Alert, Modal,
} from 'react-native';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/theme';
import { isFirebaseConfigured, auth, db, storage } from '@/services/firebase';
import {
  collection, addDoc, getDocs, query, orderBy, limit,
  doc, updateDoc, arrayUnion, serverTimestamp,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, User, updateProfile,
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface Post {
  id: string; userId: string; userName: string; userPhoto?: string;
  caption: string; watermarkedUrl: string; sceneTitle?: string; cameraModel?: string;
  settings?: { apertura?: string; velocidad?: string; iso?: string };
  likes: string[]; createdAt: any;
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    // Shared
    centered:      { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: t.colors.background },
    ncTitle:       { fontSize: 18, fontWeight: '700', color: t.colors.text, marginTop: 16, marginBottom: 8 },
    ncTxt:         { fontSize: 14, color: t.colors.textSecondary, textAlign: 'center', lineHeight: 22 },
    ncCode:        { fontFamily: 'monospace', color: t.colors.primary, backgroundColor: t.colors.card, paddingHorizontal: 4 },
    authContainer: { padding: t.spacing.xl, paddingTop: 60 },
    authTitle:     { fontSize: 28, fontWeight: '800', color: t.colors.text, marginBottom: 6 },
    authSub:       { fontSize: 14, color: t.colors.textSecondary, marginBottom: 32, lineHeight: 21 },
    input:         { backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, fontSize: 15, color: t.colors.text, borderWidth: 1, borderColor: t.colors.border, marginBottom: 12 },
    errorBox:      { flexDirection: 'row', gap: 6, alignItems: 'center', backgroundColor: t.colors.accent + '15', borderRadius: t.radius.md, padding: 10, marginBottom: 12 },
    errorTxt:      { fontSize: 13, color: t.colors.accent, flex: 1 },
    authBtn:       { backgroundColor: t.colors.primary, borderRadius: t.radius.round, paddingVertical: 14, alignItems: 'center', marginBottom: 16 },
    authBtnTxt:    { fontSize: 16, fontWeight: '800', color: '#000' },
    switchTxt:     { fontSize: 14, color: t.colors.primary, textAlign: 'center', fontWeight: '600' },
    // Top bar
    topBar:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: t.spacing.md, borderBottomWidth: 1, borderBottomColor: t.colors.border, backgroundColor: t.colors.surface },
    topGreet:      { fontSize: 15, fontWeight: '700', color: t.colors.text },
    topSub:        { fontSize: 11, color: t.colors.textMuted },
    topActions:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
    uploadBtn2:    { backgroundColor: t.colors.primary, width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    loadingRow:    { padding: 12, alignItems: 'center' },
    // Post card
    postCard:      { backgroundColor: t.colors.card, borderRadius: t.radius.lg, marginBottom: t.spacing.md, borderWidth: 1, borderColor: t.colors.border, overflow: 'hidden' },
    postHeader:    { flexDirection: 'row', alignItems: 'center', gap: 10, padding: t.spacing.md, paddingBottom: t.spacing.sm },
    postAvatar:    { width: 36, height: 36, borderRadius: 18, backgroundColor: t.colors.primary + '33', alignItems: 'center', justifyContent: 'center' },
    postAvatarTxt: { fontSize: 16, fontWeight: '800', color: t.colors.primary },
    postUser:      { fontSize: 14, fontWeight: '700', color: t.colors.text },
    postScene:     { fontSize: 11, color: t.colors.textMuted },
    postImg:       { width: '100%', height: 280 },
    postSettings:  { flexDirection: 'row', flexWrap: 'wrap', gap: 6, padding: t.spacing.sm + 2, paddingBottom: 0 },
    badge:         { backgroundColor: t.colors.background, borderRadius: t.radius.round, paddingHorizontal: 8, paddingVertical: 3 },
    cameraBadge:   { backgroundColor: t.colors.primary + '22' },
    badgeTxt:      { fontSize: 11, color: t.colors.textSecondary, fontWeight: '600' },
    postCaption:   { fontSize: 14, color: t.colors.text, padding: t.spacing.md, paddingTop: t.spacing.sm, lineHeight: 21 },
    postActions:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: t.spacing.md, paddingTop: t.spacing.sm, borderTopWidth: 1, borderTopColor: t.colors.divider },
    actionBtn:     { flexDirection: 'row', alignItems: 'center', gap: 5 },
    actionTxt:     { fontSize: 13, color: t.colors.textMuted, fontWeight: '600' },
    requestBtn:    { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: t.colors.primary + '18', borderRadius: t.radius.round, paddingHorizontal: 12, paddingVertical: 6 },
    requestTxt:    { fontSize: 12, color: t.colors.primary, fontWeight: '700' },
    // Upload modal
    modalContainer:{ flex: 1, backgroundColor: t.colors.background },
    modalHeader:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: t.spacing.md, borderBottomWidth: 1, borderBottomColor: t.colors.border, backgroundColor: t.colors.surface },
    modalTitle:    { fontSize: 17, fontWeight: '700', color: t.colors.text },
    pickArea:      { backgroundColor: t.colors.card, borderRadius: t.radius.lg, height: 200, alignItems: 'center', justifyContent: 'center', marginBottom: t.spacing.md, borderWidth: 1, borderColor: t.colors.border, overflow: 'hidden' },
    uploadPreview: { width: '100%', height: '100%' },
    pickTxt:       { fontSize: 15, fontWeight: '600', color: t.colors.textSecondary, marginTop: 8 },
    pickSub:       { fontSize: 12, color: t.colors.textMuted, marginTop: 4 },
    captionInput:  { backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, fontSize: 14, color: t.colors.text, borderWidth: 1, borderColor: t.colors.border, marginBottom: t.spacing.md, textAlignVertical: 'top', minHeight: 80 },
    watermarkNote: { flexDirection: 'row', gap: 8, backgroundColor: t.colors.success + '10', borderRadius: t.radius.md, padding: 10, marginBottom: t.spacing.md },
    watermarkTxt:  { flex: 1, fontSize: 12, color: t.colors.textSecondary, lineHeight: 18 },
    uploadBtn:     { backgroundColor: t.colors.primary, borderRadius: t.radius.round, paddingVertical: 14, alignItems: 'center' },
    uploadBtnTxt:  { fontSize: 16, fontWeight: '800', color: '#000' },
    // Request sheet
    overlay:       { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    sheet:         { backgroundColor: t.colors.surface, borderTopLeftRadius: t.radius.xl, borderTopRightRadius: t.radius.xl, padding: t.spacing.xl },
    sheetTitle:    { fontSize: 20, fontWeight: '800', color: t.colors.text, marginBottom: 6 },
    sheetSub:      { fontSize: 14, color: t.colors.textSecondary, marginBottom: 16, lineHeight: 21 },
    sheetBold:     { fontWeight: '700', color: t.colors.text },
    msgInput:      { backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, fontSize: 14, color: t.colors.text, borderWidth: 1, borderColor: t.colors.border, marginBottom: 12, textAlignVertical: 'top', minHeight: 80 },
    sendBtn:       { backgroundColor: t.colors.primary, borderRadius: t.radius.round, paddingVertical: 14, alignItems: 'center', marginBottom: 8 },
    sendBtnTxt:    { fontSize: 15, fontWeight: '800', color: '#000' },
    cancelBtn:     { alignItems: 'center', paddingVertical: 12 },
    cancelTxt:     { fontSize: 14, color: t.colors.textMuted, fontWeight: '600' },
    // Empty feed
    emptyFeed:     { alignItems: 'center', paddingVertical: 60 },
    emptyEmoji:    { fontSize: 52, marginBottom: 16 },
    emptyTitle:    { fontSize: 20, fontWeight: '700', color: t.colors.text, marginBottom: 8 },
    emptyTxt:      { fontSize: 14, color: t.colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  });
}

function NotConfigured() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.centered}>
      <Ionicons name="cloud-offline-outline" size={52} color={theme.colors.textMuted} />
      <Text style={styles.ncTitle}>Comunidad no configurada</Text>
      <Text style={styles.ncTxt}>
        Para activar el Community Feed, abre el archivo{'\n'}
        <Text style={styles.ncCode}>services/firebase.ts</Text>
        {'\n'}y pega tu configuración de Firebase.
      </Text>
    </View>
  );
}

function AuthScreen({ onAuth }: { onAuth: (u: User) => void }) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [mode,     setMode]     = useState<'login' | 'register'>('login');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [name,     setName]     = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handle = async () => {
    if (!email || !password) { setError('Completa todos los campos'); return; }
    setLoading(true); setError('');
    try {
      if (mode === 'login') {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        onAuth(cred.user);
      } else {
        if (!name) { setError('Ingresa tu nombre'); setLoading(false); return; }
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        onAuth(cred.user);
      }
    } catch (e: any) {
      const msg: Record<string, string> = {
        'auth/email-already-in-use': 'El correo ya está registrado.',
        'auth/invalid-credential':   'Correo o contraseña incorrectos.',
        'auth/weak-password':        'La contraseña debe tener al menos 6 caracteres.',
      };
      setError(msg[e.code] || 'Error al autenticar. Intenta de nuevo.');
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.authContainer}>
      <Text style={styles.authTitle}>{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</Text>
      <Text style={styles.authSub}>Únete a la comunidad de fotógrafos de FrameUp</Text>
      {mode === 'register' && (
        <TextInput style={styles.input} placeholder="Nombre de usuario" placeholderTextColor={theme.colors.textMuted} value={name} onChangeText={setName} autoCapitalize="words" />
      )}
      <TextInput style={styles.input} placeholder="Correo electrónico" placeholderTextColor={theme.colors.textMuted} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor={theme.colors.textMuted} value={password} onChangeText={setPassword} secureTextEntry />
      {error !== '' && (
        <View style={styles.errorBox}>
          <Ionicons name="warning-outline" size={14} color={theme.colors.accent} />
          <Text style={styles.errorTxt}>{error}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.authBtn} onPress={handle} disabled={loading}>
        {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.authBtnTxt}>{mode === 'login' ? 'Entrar' : 'Registrarme'}</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setMode(mode === 'login' ? 'register' : 'login')}>
        <Text style={styles.switchTxt}>{mode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function PostCard({ post, currentUserId, onLike, onRequest }: { post: Post; currentUserId: string; onLike: (id: string) => void; onRequest: (p: Post) => void }) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const liked   = post.likes.includes(currentUserId);
  const isOwner = post.userId === currentUserId;
  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.postAvatar}>
          <Text style={styles.postAvatarTxt}>{(post.userName || 'U')[0].toUpperCase()}</Text>
        </View>
        <View>
          <Text style={styles.postUser}>{post.userName}</Text>
          {post.sceneTitle && <Text style={styles.postScene}>{post.sceneTitle}</Text>}
        </View>
      </View>
      <Image source={{ uri: post.watermarkedUrl }} style={styles.postImg} resizeMode="cover" />
      {post.settings && (
        <View style={styles.postSettings}>
          {post.settings.apertura  && <View style={styles.badge}><Text style={styles.badgeTxt}>{post.settings.apertura}</Text></View>}
          {post.settings.velocidad && <View style={styles.badge}><Text style={styles.badgeTxt}>{post.settings.velocidad}</Text></View>}
          {post.settings.iso       && <View style={styles.badge}><Text style={styles.badgeTxt}>{post.settings.iso}</Text></View>}
          {post.cameraModel        && <View style={[styles.badge, styles.cameraBadge]}><Text style={styles.badgeTxt}>{post.cameraModel}</Text></View>}
        </View>
      )}
      {post.caption !== '' && <Text style={styles.postCaption}>{post.caption}</Text>}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => onLike(post.id)}>
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={20} color={liked ? theme.colors.accent : theme.colors.textMuted} />
          <Text style={styles.actionTxt}>{post.likes.length}</Text>
        </TouchableOpacity>
        {!isOwner && (
          <TouchableOpacity style={styles.requestBtn} onPress={() => onRequest(post)}>
            <Ionicons name="download-outline" size={15} color={theme.colors.primary} />
            <Text style={styles.requestTxt}>Solicitar original</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

function UploadModal({ visible, user, onClose, onUploaded }: { visible: boolean; user: User; onClose: () => void; onUploaded: () => void }) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [imgUri,  setImgUri]  = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const pick = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.85 });
    if (!res.canceled) setImgUri(res.assets[0].uri);
  };

  const upload = async () => {
    if (!imgUri) { Alert.alert('Selecciona una foto primero'); return; }
    setLoading(true);
    try {
      const blob = await (await fetch(imgUri)).blob();
      const storageRef = ref(storage, `posts/${user.uid}/${Date.now()}.jpg`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      await addDoc(collection(db, 'posts'), { userId: user.uid, userName: user.displayName || 'Fotógrafo', watermarkedUrl: url, caption, likes: [], createdAt: serverTimestamp() });
      setImgUri(null); setCaption('');
      onUploaded(); onClose();
    } catch {
      Alert.alert('Error', 'No se pudo subir la foto. Intenta de nuevo.');
    }
    setLoading(false);
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Compartir foto</Text>
          <TouchableOpacity onPress={onClose}><Ionicons name="close" size={22} color={theme.colors.text} /></TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ padding: theme.spacing.md }}>
          <TouchableOpacity style={styles.pickArea} onPress={pick}>
            {imgUri
              ? <Image source={{ uri: imgUri }} style={styles.uploadPreview} resizeMode="cover" />
              : (<>
                  <Ionicons name="image-outline" size={36} color={theme.colors.textMuted} />
                  <Text style={styles.pickTxt}>Toca para seleccionar foto</Text>
                  <Text style={styles.pickSub}>Se añadirá tu marca FrameUp/@{user.displayName}</Text>
                </>)
            }
          </TouchableOpacity>
          <TextInput style={styles.captionInput} placeholder="Escribe algo sobre esta foto... (opcional)" placeholderTextColor={theme.colors.textMuted} value={caption} onChangeText={setCaption} multiline numberOfLines={3} />
          <View style={styles.watermarkNote}>
            <Ionicons name="shield-checkmark-outline" size={14} color={theme.colors.success} />
            <Text style={styles.watermarkTxt}>Tu foto se publicará con marca de agua "FrameUp". La versión original permanece privada y solo se comparte si tú lo apruebas.</Text>
          </View>
          <TouchableOpacity style={[styles.uploadBtn, loading && { opacity: 0.6 }]} onPress={upload} disabled={loading}>
            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.uploadBtnTxt}>Publicar foto</Text>}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}

function RequestModal({ post, visible, currentUser, onClose }: { post: Post | null; visible: boolean; currentUser: User | null; onClose: () => void }) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [msg,     setMsg]     = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!post || !currentUser) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'photo_requests'), {
        postId: post.id, ownerId: post.userId,
        requesterId: currentUser.uid, requesterName: currentUser.displayName || 'Fotógrafo',
        message: msg || 'Hola, me gustaría obtener la versión original de tu foto.',
        type: 'free', status: 'pending', createdAt: serverTimestamp(),
      });
      Alert.alert('¡Solicitud enviada!', 'El fotógrafo recibirá tu mensaje y decidirá si compartir la imagen original.');
      setMsg(''); onClose();
    } catch {
      Alert.alert('Error', 'No se pudo enviar la solicitud.');
    }
    setLoading(false);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Solicitar foto original</Text>
          <Text style={styles.sheetSub}>
            Se enviará una solicitud a <Text style={styles.sheetBold}>{post?.userName}</Text>. Él/ella decide si compartir la imagen sin marca de agua.
          </Text>
          <TextInput style={styles.msgInput} placeholder="Tu mensaje (opcional)" placeholderTextColor={theme.colors.textMuted} value={msg} onChangeText={setMsg} multiline numberOfLines={3} />
          <TouchableOpacity style={styles.sendBtn} onPress={send} disabled={loading}>
            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.sendBtnTxt}>Enviar solicitud</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelTxt}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default function CommunityScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [user,       setUser]       = useState<User | null>(null);
  const [posts,      setPosts]      = useState<Post[]>([]);
  const [loading,    setLoading]    = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [reqPost,    setReqPost]    = useState<Post | null>(null);

  if (!isFirebaseConfigured()) return <NotConfigured />;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(30));
      const snap = await getDocs(q);
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Post)));
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { if (user) loadPosts(); }, [user, loadPosts]);

  const handleLike = async (postId: string) => {
    if (!user) return;
    await updateDoc(doc(db, 'posts', postId), { likes: arrayUnion(user.uid) });
    loadPosts();
  };

  if (!user) return <AuthScreen onAuth={setUser} />;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.topGreet}>Hola, {user.displayName || 'Fotógrafo'} 👋</Text>
          <Text style={styles.topSub}>Comunidad FrameUp</Text>
        </View>
        <View style={styles.topActions}>
          <TouchableOpacity style={styles.uploadBtn2} onPress={() => setUploadOpen(true)}>
            <Ionicons name="add" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signOut(auth)}>
            <Ionicons name="log-out-outline" size={22} color={theme.colors.textMuted} />
          </TouchableOpacity>
        </View>
      </View>

      {loading && <View style={styles.loadingRow}><ActivityIndicator color={theme.colors.primary} /></View>}

      <ScrollView contentContainerStyle={{ padding: theme.spacing.md }} showsVerticalScrollIndicator={false} onScrollEndDrag={loadPosts}>
        {posts.length === 0 && !loading && (
          <View style={styles.emptyFeed}>
            <Text style={styles.emptyEmoji}>📸</Text>
            <Text style={styles.emptyTitle}>Sé el primero en publicar</Text>
            <Text style={styles.emptyTxt}>Comparte tus fotos con la comunidad de fotógrafos de FrameUp.</Text>
          </View>
        )}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} currentUserId={user.uid} onLike={handleLike} onRequest={setReqPost} />
        ))}
        <View style={{ height: 32 }} />
      </ScrollView>

      <UploadModal visible={uploadOpen} user={user} onClose={() => setUploadOpen(false)} onUploaded={loadPosts} />
      <RequestModal post={reqPost} visible={!!reqPost} currentUser={user} onClose={() => setReqPost(null)} />
    </View>
  );
}
